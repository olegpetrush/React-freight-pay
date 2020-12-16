import cuid from 'cuid'
import { isNil } from 'lodash'

import { DEPENDENCIES } from '../../utils/constants'

const Mutation = {
  createPaymentRequest: (_: any, { data }: any, { user, container }: any) => {
    const paymentRequestRepository = container.get(
      DEPENDENCIES.PAYMENT_REQUEST_REPOSITORY
    )
    const { clientId, organizationId } = data
    const { id: userId } = user
    const id = cuid()
    const paymentRequestData = {
      ...data,
      id,
      client: { id: clientId },
      organization: { id: organizationId },
      createdBy: { id: userId }
    }
    return paymentRequestRepository.create(paymentRequestData)
  },
  updatePaymentRequest: (_: any, { where, data }: any, context: any) => {
    const { container, user } = context
    const { id } = user
    const paymentRequestRepository = container.get(
      DEPENDENCIES.PAYMENT_REQUEST_REPOSITORY
    )
    const updateWhere = isNil(where) ? { id } : where
    return paymentRequestRepository.update(updateWhere, data)
  }
}

const Query = {
  paymentRequests: (_: any, { where }: any, { container }: any) => {
    const paymentRequestRepository = container.get(
      DEPENDENCIES.PAYMENT_REQUEST_REPOSITORY
    )
    return paymentRequestRepository.get(where)
  },
  paymentRequest: (_: any, { where }: any, { container }: any) => {
    const paymentRequestRepository = container.get(
      DEPENDENCIES.PAYMENT_REQUEST_REPOSITORY
    )
    return paymentRequestRepository.getOne(where)
  }
}

const Subscription = {}

export default { Mutation, Query, Subscription }
