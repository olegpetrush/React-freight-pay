const cuid = require('cuid')
const crypto = require('crypto')
import { isNil, get, omit } from 'lodash'
import { Client } from 'dwolla-v2'

import { DWOLLA_OPTIONS, API_URL } from '../../config/vars'
import { DWOLLA_ACTION_TYPES, DEPENDENCIES } from '../utils/constants'
import { User } from '@sentry/node'

const {
  DWOLLA_KEY: key,
  DWOLLA_SECRET: secret,
  DWOLLA_ENV: environment,
  DWOLLA_WEBHOOK_SECRET: webhookSecret
} = DWOLLA_OPTIONS

const methods = { GET: 'get', POST: 'post' }

type Customer = {
  get?: (x: any) => any
  add?: (x: any) => any
  update?: (x: any) => any
}

type WebhookSubscription = {
  list?: () => any
  get?: (x: any) => any
  add?: (x: any) => any
  update?: (x: any) => any
}

type BusinessClassification = {
  list?: () => any
  get?: (x: any) => any
}

class DwollaService {
  container: any
  user: User | null = null
  dwollaClient = new Client({ key, secret, environment })
  dwollaResponseLogRepository: any

  constructor(container: any) {
    this.container = container
    this.dwollaResponseLogRepository = container.get(
      DEPENDENCIES.DWOLLA_RESPONSE_LOG_REPOSITORY
    )
  }

  setUser = (user: User) => (this.user = user)

  requestDwollaAPI = async (
    method: string,
    endpoint: string,
    data?: object | null
  ) => {
    const appToken = await this.dwollaClient.auth.client()
    if (isNil(data)) return appToken[method](endpoint)

    const dwollaIdempotencyKey = get(data, 'dwollaIdempotencyKey', cuid())
    const body = omit(data, 'dwollaIdempotencyKey')
    return appToken[method](endpoint, body, {
      'Idempotency-Key': dwollaIdempotencyKey
    })
  }

  createDwollaResponseLog = (fn: any, type: DWOLLA_ACTION_TYPES) => async (
    args: any
  ) => {
    const dwollaResponse = await fn(...args)
    const requestId = dwollaResponse.headers.get('x-request-id').toString()
    const status = dwollaResponse.status
    const responseBody = dwollaResponse.body
    const responseHeaders = {
      date: dwollaResponse.headers.get('date'),
      'content-type': dwollaResponse.headers.get('content-type'),
      'content-length': dwollaResponse.headers.get('content-length'),
      connection: dwollaResponse.headers.get('connection'),
      'set-cookie': dwollaResponse.headers.get('set-cookie'),
      'access-control-allow-origin': dwollaResponse.headers.get(
        'access-control-allow-origin'
      ),
      'access-control-expose-headers': dwollaResponse.headers.get(
        'access-control-expose-headers'
      ),
      location: dwollaResponse.headers.get('location'),
      'x-request-id': dwollaResponse.headers.get('x-request-id'),
      'cf-cache-status': dwollaResponse.headers.get('cf-cache-status'),
      'cf-request-id': dwollaResponse.headers.get('cf-request-id'),
      'expect-ct': dwollaResponse.headers.get('expect-ct'),
      server: dwollaResponse.headers.get('server'),
      'cf-ray': dwollaResponse.headers.get('cf-ray')
    }
    const dwollaResponseLog = {
      id: requestId,
      type,
      request: args,
      responseBody,
      responseHeaders,
      status,
      user: this.user
    }
    this.dwollaResponseLogRepository.create(dwollaResponseLog)

    return dwollaResponse
  }

  // Dwolla Customers
  customerFns = {
    get: [
      (customerId: string) => {
        const { GET } = methods
        const endpoint = `customers/${customerId}`
        return this.requestDwollaAPI(GET, endpoint)
      },
      { type: DWOLLA_ACTION_TYPES.GET_CUSTOMER }
    ],

    add: [
      async (data: any) => {
        const { POST } = methods
        const endpoint = 'customers'
        return this.requestDwollaAPI(POST, endpoint, data)
      },
      { type: DWOLLA_ACTION_TYPES.ADD_CUSTOMER }
    ],

    addBusiness: [
      async (data: any) => {
        const { POST } = methods
        const endpoint = 'customers'
        return this.requestDwollaAPI(POST, endpoint, data)
      },
      { type: DWOLLA_ACTION_TYPES.ADD_BUSINESS_CUSTOMER }
    ],

    update: [
      ({ customerId, ...data }: any) => {
        const { POST } = methods
        const endpoint = `customers/${customerId}`
        return this.requestDwollaAPI(POST, endpoint, data)
      },
      { type: DWOLLA_ACTION_TYPES.UPDATE_CUSTOMER }
    ]
  }

  customer: Customer = Object.entries(this.customerFns).reduce(
    (acc: any, [key, [fn, obj]]) => {
      const type = get(obj, 'type')
      acc[key] = (...args: any) => this.createDwollaResponseLog(fn, type)(args)
      return acc
    },
    {}
  )

  // Dwolla Webhook Subscriptions
  webhookSubscriptionFns = {
    list: [
      () => {
        const { GET } = methods
        const endpoint = 'webhook-subscriptions'
        return this.requestDwollaAPI(GET, endpoint)
      },
      { type: DWOLLA_ACTION_TYPES.GET_WEBHOOK_SUBSCRIPTIONS }
    ],
    create: [
      () => {
        const { POST } = methods
        const endpoint = 'webhook-subscriptions'
        const data = {
          url: `${API_URL}/dwolla-webhook`,
          secret: webhookSecret
        }
        return this.requestDwollaAPI(POST, endpoint, data)
      },
      { type: DWOLLA_ACTION_TYPES.GET_CUSTOMER }
    ]
  }

  webhookSubscription: WebhookSubscription = Object.entries(
    this.webhookSubscriptionFns
  ).reduce((acc: any, [key, [fn, obj]]) => {
    const type = get(obj, 'type')
    acc[key] = (...args: any) => this.createDwollaResponseLog(fn, type)(args)
    return acc
  }, {})

  utils = {
    verifyGatewaySignature: (proposedSignature: string, payloadBody: any) => {
      const body = JSON.stringify(payloadBody)
      const hash = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex')
      return proposedSignature === hash
    }
  }

  // Business Classifications
  businessClassificationsFns = {
    list: [
      () => {
        const { GET } = methods
        const endpoint = 'business-classifications'
        return this.requestDwollaAPI(GET, endpoint)
      },
      { type: DWOLLA_ACTION_TYPES.GET_BUSINESS_CLASSIFICATIONS }
    ],
    get: [
      (businessClassificationId: string) => {
        const { GET } = methods
        const endpoint = `business-classifications/${businessClassificationId}`
        return this.requestDwollaAPI(GET, endpoint)
      },
      { type: DWOLLA_ACTION_TYPES.GET_BUSINESS_CLASSIFICATION }
    ]
  }

  businessClassification: BusinessClassification = Object.entries(
    this.businessClassificationsFns
  ).reduce((acc: any, [key, [fn, obj]]) => {
    const type = get(obj, 'type')
    acc[key] = (...args: any) => this.createDwollaResponseLog(fn, type)(args)
    return acc
  }, {})
}

export default DwollaService

// const fundingSourceFns = {
//   get: [(customerId) => {
//     const { GET } = methods;
//     const endpoint = `customers/${customerId}/funding-sources`;
//     return requestDwollaAPI(GET, endpoint);
//   }, { type: DWOLLA_ACTION_TYPES.GET_FUNDING_SOURCES }],

//   getOne: [(fundingSourceId) => {
//     const { GET } = methods;
//     const endpoint = `funding-sources/${fundingSourceId}`;
//     return requestDwollaAPI(GET, endpoint);
//   }, { type: DWOLLA_ACTION_TYPES.GET_FUNDING_SOURCE }],

//   add: [({ customerId, ...data }) => {
//     const { POST } = methods;
//     const endpoint = `customers/${customerId}/funding-sources`;
//     return requestDwollaAPI(POST, endpoint, data);
//   }, { type: DWOLLA_ACTION_TYPES.ADD_FUNDING_SOURCE }],

//   update: [
//     (fundingSourceId, data) => {
//       const { POST } = methods;
//       const endpoint = `funding-sources/${fundingSourceId}`;
//       return requestDwollaAPI(POST, endpoint, data);
//     },
//     { type: DWOLLA_ACTION_TYPES.UPDATE_FUNDING_SOURCE }
//   ],

//   delete: [(fundingSourceId) => {
//     const { POST } = methods;
//     const endpoint = `funding-sources/${fundingSourceId}`;
//     return requestDwollaAPI(POST, endpoint, { removed: true });
//   }, { type: DWOLLA_ACTION_TYPES.DELETE_FUNDING_SOURCE }]
// };

// type FundingSource = {
//   get?: (x: any) => any;
//   getOne?: (x: any) => any;
//   add?: (x: any) => any;
//   update?: (x: any) => any;
//   delete?: (x: any) => any;
// }

// const fundingSource: FundingSource = Object
//   .entries(fundingSourceFns)
//   .reduce((acc, [key, [fn, obj]], index) => {
//     const type = get(obj, 'type')
//     acc[key] = (...args) => createDwollaResponseLog(fn, type)(args);
//     return acc
//   }, {})

// const transferFns = {
//   create: [(data) => {
//     const { source, destination, amount, dwollaIdempotencyKey, metadata = {} } = data;
//     const body = {
//       _links: {
//         destination: {
//           href: destination,
//         },
//         source: {
//           href: source,
//         },
//       },
//       amount: {
//         currency: 'USD',
//         value: amount,
//       },
//       metadata,
//       dwollaIdempotencyKey,
//     };
//     const { POST } = methods;
//     const endpoint = 'transfers';
//     return requestDwollaAPI(POST, endpoint, body);
//   }, { type: DWOLLA_ACTION_TYPES.CREATE_TRANSFER }],

//   get: [(transferId) => {
//     const { GET } = methods;
//     const endpoint = `transfers/${transferId}`;
//     return requestDwollaAPI(GET, endpoint);
//   }, { type: DWOLLA_ACTION_TYPES.GET_TRANSFER }],

//   cancel: [(transferId) => {
//     const { POST } = methods;
//     const endpoint = `transfers/${transferId}`;
//     return requestDwollaAPI(POST, endpoint, { status: 'cancelled' });
//   }, { type: DWOLLA_ACTION_TYPES.CANCEL_TRANSFER }],

//   transferFailure: [async (transferId) => {
//     const { GET } = methods;
//     const endpoint = `transfers/${transferId}/failure`;
//     const result = await requestDwollaAPI(GET, endpoint, { transferId });
//     const { code, description, explanation } = result.body;
//     return { code, description, reason: explanation };
//   }, { type: DWOLLA_ACTION_TYPES.CANCEL_TRANSFER_FAILURE }]
// };

// type Transfer = {
//   create?: (x: any) => any;
//   get?: (x: any) => any;
//   cancel?: (x: any) => any;
//   transferFailure?: (x: any) => any;
// }

// const transfer: Transfer = Object
//   .entries(transferFns)
//   .reduce((acc, [key, [fn, obj]], index) => {
//     const type = get(obj, 'type')
//     acc[key] = (...args) => createDwollaResponseLog(fn, type)(args);
//     return acc
//   }, {})

// const documentFns = {
//   upload: [async (data) => {
//     const { POST } = methods;
//     const { customerId, name, file, contentType, documentType } = data;
//     const requestBody = new FormData();

//     requestBody.append('file', fs.createReadStream(file), {
//       filename: name,
//       contentType,
//       knownLength: fs.statSync(file).size
//     });
//     requestBody.append('documentType', documentType);

//     const endpoint = `customers/${customerId}/documents`;
//     return requestDwollaAPI(POST, endpoint, requestBody);
//   }, { type: DWOLLA_ACTION_TYPES.UPLOAD_DOCUMENT }],
//   get: [(documentId) => {
//     const { GET } = methods;
//     const endpoint = `documents/${documentId}`;
//     return requestDwollaAPI(GET, endpoint);
//   }, { type: DWOLLA_ACTION_TYPES.GET_DOCUMENT }]
// };

// type Document = {
//   upload?: (x: any) => any;
//   get?: (x: any) => any;
// }

// const document: Document = Object
//   .entries(documentFns)
//   .reduce((acc, [key, [fn, obj]], index) => {
//     const type = get(obj, 'type')
//     acc[key] = (...args) => createDwollaResponseLog(fn, type)(args);
//     return acc
//   }, {})

// const kbaFns = {
//   initiateKbaSession: [(customerId) => {
//     const { POST } = methods;
//     const endpoint = `customers/${customerId}/kba`;
//     return requestDwollaAPI(POST, endpoint);
//   }, { type: DWOLLA_ACTION_TYPES.INITIATE_KBA_SESSION }],

//   retrieveKbaQuestions: [(kbaId) => {
//     const { GET } = methods;
//     const endpoint = `kba/${kbaId}`;
//     return requestDwollaAPI(GET, endpoint);
//   }, { type: DWOLLA_ACTION_TYPES.RETRIEVE_KBA_QUESTIONS }],

//   verifyKbaQuestions: [({ kbaId, body }) => {
//     const { POST } = methods;
//     const endpoint = `kba/${kbaId}`;
//     return requestDwollaAPI(POST, endpoint, body);
//   }, { type: DWOLLA_ACTION_TYPES.VERIFY_KBA_QUESTIONS }]
// };

// type Kba = {
//   initiateKbaSession?: (x: any) => any;
//   retrieveKbaQuestions?: (x: any) => any;
//   verifyKbaQuestions?: (x: any) => any;
// }

// const kba: Kba = Object
//   .entries(kbaFns)
//   .reduce((acc, [key, [fn, obj]], index) => {
//     const type = get(obj, 'type')
//     acc[key] = (...args) => createDwollaResponseLog(fn, type)(args);
//     return acc
//   }, {})

// const utils = {
//   verifyGatewaySignature: (proposedSignature, payloadBody) => {
//     const body = JSON.stringify(payloadBody);
//     const hash = crypto.createHmac('sha256', webhookSecret).update(body).digest('hex');

//     return proposedSignature === hash;
//   },

//   simulateTransferProcess: async () => {
//     const { POST } = methods;
//     const endpoint = `https://api-sandbox.dwolla.com/sandbox-simulations`;
//     const result = await requestDwollaAPI(POST, endpoint);
//     return result
//   },

//   simulateTransferFail: async (dwollaFundingSourceId) => {
//     const { POST } = methods;
//     const endpoint = `https://api-sandbox.dwolla.com/funding-sources/${dwollaFundingSourceId}`;
//     const body = {
//       name: 'R03'
//     };
//     const result = await requestDwollaAPI(POST, endpoint, body);
//     return result
//   },

//   webhookSubscription: async () => {
//     const { POST } = methods;
//     const endpoint = 'webhook-subscriptions';
//     const requestBody = {
//       url: `${API_URL}/dwolla-webhook/notification`,
//       secret: webhookSecret,
//     };
//     const result = await requestDwollaAPI(POST, endpoint, requestBody);
//     return result;
//   },
// };

// export default {
//   apiUrl,
//   customer,
//   transfer,
//   document,
//   kba,
//   fundingSource,
//   utils,
// };
