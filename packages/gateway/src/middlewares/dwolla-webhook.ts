import cuid from 'cuid'
import { isNil, isEmpty, camelCase } from 'lodash'
import dwollaCustomerHooks from '../hooks/customer'
import { DEPENDENCIES } from '../utils/constants'

const { CustomerCreated, CustomerReverificationNeeded } = dwollaCustomerHooks

const topics: any = {
  customers: [
    'customer_created',
    'customer_verified',
    'customer_activated',
    'customer_deactivated',
    'customer_suspended',
    'customer_reverification_needed'
  ],
  documents: [
    'customer_verification_document_needed',
    'customer_verification_document_uploaded',
    'customer_verification_document_failed',
    'customer_verification_document_approved'
  ],
  kbas: [
    'customer_kba_verification_needed',
    'customer_kba_verification_failed',
    'customer_kba_verification_passed'
  ],
  transfers: [
    'customer_transfer_created',
    'customer_transfer_cancelled',
    'customer_transfer_failed',
    'customer_transfer_completed',
    'customer_bank_transfer_created',
    'customer_bank_transfer_cancelled',
    'customer_bank_transfer_failed',
    'customer_bank_transfer_completed'
  ]
}

const customerStatus: any = {
  customerCreated: {
    process: ({ container, data }: any) => {
      const customerCreated = new CustomerCreated(container)
      return customerCreated.updateStatuses(data)
    }
  },
  customerVerified: {
    process: ({ container, data }: any) => {
      const customerVerified = container.get(
        DEPENDENCIES.CUSTOMER_VERIFIED_HOOK
      )
      customerVerified.sendNotification(data)
      return customerVerified.updateStatuses(data)
    }
  },
  customerActivated: {
    process: ({ container, data }: any) => {
      console.log('customerActivated')
      const customerActivated = container.get(
        DEPENDENCIES.CUSTOMER_ACTIVATED_HOOK
      )
      customerActivated.sendNotification(data)
      return customerActivated.updateStatuses(data)
    }
  },
  customerDeactivated: {
    process: ({ container, data }: any) => {
      console.log('customerDeactivated')
      const customerDeactivated = container.get(
        DEPENDENCIES.CUSTOMER_DEACTIVATED_HOOK
      )
      customerDeactivated.sendNotification(data)
      return customerDeactivated.updateStatuses(data)
    }
  },
  customerSuspended: {
    process: ({ container, data }: any) => {
      const customerSuspended = container.get(
        DEPENDENCIES.CUSTOMER_SUSPENDED_HOOK
      )
      customerSuspended.sendNotification(data)
      return customerSuspended.updateStatuses(data)
    }
  },
  customerReverificationNeeded: {
    process: ({ container, data }: any) => {
      const customerReverificationNeeded = new CustomerReverificationNeeded(
        container
      )
      return customerReverificationNeeded.updateStatuses(data)
    }
  }
}

export const customerProcess = async ({ event, container }: any) => {
  const userRepository = container.get(DEPENDENCIES.USER_REPOSITORY)
  const { topic, resourceId } = event
  const user = await userRepository.getOne({ dwollaCustomerId: resourceId })
  if (isNil(user)) throw new Error('Customer not found')

  const { id: userId } = user
  const data = { userId }
  const updatedUser = await customerStatus[camelCase(topic)].process({
    data,
    container
  })
  console.log('updatedUser', updatedUser)
  return updatedUser
  // return container.get(DEPENDENCIES.SUBSCRIPTION_MANAGER).publish('userUpdated', updatedUser);
}

const customerDocumentStatus: any = {
  customerVerificationDocumentNeeded: {
    process: ({ container, data }: any) => {
      const documentNeeded = container.get(DEPENDENCIES.DOCUMENT_NEEDED_HOOK)
      documentNeeded.updateStatuses(data)
      documentNeeded.sendNotification(data)
    }
  },
  customerVerificationDocumentUploaded: {
    process: () => {
      console.log('customerVerificationDocumentUploaded process')
    }
  },
  customerVerificationDocumentFailed: {
    process: () => {
      console.log('customerVerificationDocumentFailed process')
    }
  },
  customerVerificationDocumentApproved: {
    process: () => {
      console.log('customerVerificationDocumentApproved process')
    }
  }
}

const documentProcess = async ({ event, container }: any) => {
  const { topic, _links } = event
  const userRepository = container.get(DEPENDENCIES.USER_REPOSITORY)

  const dwollaCustomerId = _links.customer.href.split('/').slice(-1)[0]
  const user = await userRepository.getOne({ dwollaCustomerId })
  if (isNil(user)) throw new Error('Customer not found')

  const { id: userId } = user
  const data = { userId }
  customerDocumentStatus[camelCase(topic)].process({ data, container })
}

const customerKbaStatus: any = {
  customerKbaVerificationNeeded: {
    process: ({ container, data }: any) => {
      const kbaNeeded = container.get(DEPENDENCIES.KBA_NEEDED_HOOK)
      kbaNeeded.updateStatuses(data)
      kbaNeeded.sendNotification(data)
    }
  },
  customerKbaVerificationFailed: {
    process: ({ container, data }: any) => {
      const kbaFailed = container.get(DEPENDENCIES.KBA_FAILED_HOOK)
      kbaFailed.sendNotification(data)
    }
  },
  customerKbaVerificationPassed: {
    process: ({ container, data }: any) => {
      const kbaPassed = container.get(DEPENDENCIES.KBA_PASSED_HOOK)
      kbaPassed.sendNotification(data)
    }
  }
}

const kbaProcess = async ({ event, container }: any) => {
  const { topic, resourceId } = event
  const userRepository = container.get(DEPENDENCIES.USER_REPOSITORY)

  const user = await userRepository.getOne({ dwollaCustomerId: resourceId })
  if (isNil(user)) throw new Error('Customer not found')

  const { id: userId } = user
  const data = { userId }
  customerKbaStatus[camelCase(topic)].process({ data, container })
}

// const transferStatus = {
//   customerTransferCreated: {
//     process: () => {
//       console.log('customerTransferCreated process')
//     },
//   },
//   customerTransferCancelled: {
//     process: () => {
//       console.log('customerTransferCancelled process')
//     },
//   },
//   // customerTransferFailed: {
//   //   process: async ({ event, container }: any) => {
//   //     const { resourceId } = event;
//   //     const transferFailure = await dwollaService.transfer.transferFailure(resourceId);
//   //     const transactionStatusRepository = container.get(
//   //       "transactionStatusRepository"
//   //     );
//   //     await transactionStatusRepository.create({ id: cuid(), resourceId, status: TransactionStatuses.FAILED, reason: transferFailure.reason });
//   //   }
//   // },
//   customerTransferCompleted: {
//     process: () => {},
//   },
//   customerBankTransferCreated: {
//     process: () => {},
//   },
//   customerBankTransferCancelled: {
//     process: () => {},
//   },
//   customerBankTransferFailed: {
//     process: () => {},
//   },
//   customerBankTransferCompleted: {
//     process: () => {},
//   },
// };

// const transferProcess = async ({ event, container }) => {
//   const { topic } = event;
//   transferStatus[camelCase(topic)].process({ event, container });
// };

const processType = (topic: string) => {
  const keys = Object.keys(topics).filter(key => topics[key].includes(topic))
  return !isEmpty(keys) ? keys[0] : 'default'
}

const processEvent: any = {
  customers: (data: any) => customerProcess(data),
  documents: (data: any) => documentProcess(data),
  kbas: (data: any) => kbaProcess(data),
  // transfers: (data: any) => transferProcess(data),
  default: () => {
    console.log('processEvent default')
  }
}

export const dwollaWebhookMiddleware = async (req: any, res: any) => {
  try {
    const { headers, body, app } = req
    const { id: eventId, resourceId, topic } = body

    const container = app.get(DEPENDENCIES.CONTAINER)
    const dwollaService = container.get(DEPENDENCIES.DWOLLA_SERVICE)
    const dwollaWebhookLogRepository = container.get(
      DEPENDENCIES.DWOLLA_WEBHOOK_LOG_REPOSITORY
    )

    const signature = headers['x-request-signature-sha-256']
    const authorized = dwollaService.utils.verifyGatewaySignature(
      signature,
      body
    )

    if (!authorized) return res.sendStatus(403)

    // this needs to user the resourceId to form a relation to a User for some topics
    await dwollaWebhookLogRepository.create({
      id: cuid(),
      eventId,
      resourceId,
      topic,
      event: body
    })

    await processEvent[processType(topic)]({ event: body, container })
    res.sendStatus(204)
  } catch (err) {
    return res.sendStatus(500)
  }
}
