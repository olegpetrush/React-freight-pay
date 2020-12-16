import cuid from 'cuid'
import { reduce } from 'lodash'
import { DEPENDENCIES, SERVICE_NAME } from '../../utils/constants'

const STATE = {
  SUCCESS: 'Success',
  FAILURE: 'Failure'
}

const TYPE = {
  INPUT: 'Input',
  OUTPUT: 'Output'
}

const requestBuild = (data: any) => {
  const request: any = {}
  request.endPoint = data.endPoint
  request.body = data.body
  request.type = data.type
  request.tracking = {
    source: {
      serviceName: SERVICE_NAME,
      state: data.state
    }
  }
  return request
}

const saveTrackingRequest = async ({ data, container }: any) => {
  const requestRepository = container.get(DEPENDENCIES.REQUEST_REPOSITORY)
  const requestTrackingRepository = container.get(
    DEPENDENCIES.REQUEST_TRACKING_REPOSITORY
  )
  const request = requestBuild(data)
  const requestId = cuid()
  await requestRepository.create({
    ...request,
    id: requestId
  })
  await requestTrackingRepository.create({
    ...request.tracking,
    request: { id: requestId }
  })
}

const requestTracker = (resolver: any, endPoint: any) => async (
  parent: any,
  args: any,
  context: any
) => {
  saveTrackingRequest({
    data: { body: args, state: STATE.SUCCESS, endPoint, type: TYPE.INPUT },
    container: context.container
  })
  try {
    const result = await resolver(parent, args, context)
    saveTrackingRequest({
      data: { state: STATE.SUCCESS, endPoint, type: TYPE.OUTPUT },
      container: context.container
    })
    return result
  } catch (error) {
    saveTrackingRequest({
      data: { body: error.message, state: STATE.FAILURE, endPoint },
      container: context.container
    })
  }
}

const applyQueryTracker = (Query: any) =>
  reduce(
    Query,
    (result: any, element, key) => {
      result[key] = requestTracker(element, key)
      return result
    },
    {}
  )

export const applyTracker = (resolvers: any) =>
  resolvers.map(
    ({
      Query = {},
      Mutation = {},
      Subscription
    }: {
      Query?: any
      Mutation?: any
      Subscription?: any
    } = {}) => ({
      Query: applyQueryTracker(Query),
      Mutation: applyQueryTracker(Mutation),
      Subscription: applyQueryTracker(Subscription)
    })
  )

// export const reverseTransaction = async ({ transaction, container }: any) => {
//   const transactionRepository = container.get(DEPENDENCIES.TRANSACTION_REPOSITORY);
//   const transactionStatusRepository = container.get(DEPENDENCIES.TRANSACTION_STATUS_REPOSITORY);
//   const transactionRecordRepository = container.get(DEPENDENCIES.TRANSACTION_RECORD_REPOSITORY);

//   if (isNil(transaction)) throw Error('Transaction not found');
//   if (isNil(transaction.transactionRecords)) throw Error('Records not found');

//   const { resourceId, transactionRecords: records } = transaction;
//   const [sender] = records.filter((record: any) => record.amount > 0);
//   const [recipient] = records.filter((record: any) => record.amount < 0);
//   if (isNil(sender) || isNil(recipient)) throw Error('Transaction Account for reverse not found');

//   const senderTransactionAccount = sender.transactionAccount;
//   const recipientTransactionAccount = recipient.transactionAccount;

//   const transferAmount = parseFloat(sender.amount);
//   const debit = -1 * transferAmount;
//   const credit = transferAmount;

//   const reversalTransaction = await transactionRepository.create({ id: cuid(), resourceId, status: TransactionStatuses.REVERSED });
//   await transactionStatusRepository.create({ id: cuid(), transaction: reversalTransaction.id, status: TransactionStatuses.REVERSED });
//   await transactionStatusRepository.create({ id: cuid(), transaction: reversalTransaction.id, status: TransactionStatuses.CLEARED });

//   await transactionRecordRepository.create({ id: cuid(), transaction: reversalTransaction.id, amount: debit, transactionAccount: senderTransactionAccount });
//   await transactionRecordRepository.create({ id: cuid(), transaction: reversalTransaction.id, amount: credit, transactionAccount: recipientTransactionAccount });
// };
