import { isNil } from 'lodash'

import { DEPENDENCIES } from '../../utils/constants'

const Mutation = {
  updateAddress: (_: any, { where, data }: any, context: any) => {
    const { container, user } = context
    const { id } = user
    const addressRepository = container.get(DEPENDENCIES.ADDRESS_REPOSITORY)
    const updateWhere = isNil(where) ? { id } : where
    return addressRepository.update(updateWhere, data)
  }
}

const Query = {
  addresses: (_: any, { where }: any, { container }: any) => {
    const addressRepository = container.get(DEPENDENCIES.ADDRESS_REPOSITORY)
    return addressRepository.get(where)
  },
  address: (_: any, { where }: any, { container }: any) => {
    const addressRepository = container.get(DEPENDENCIES.ADDRESS_REPOSITORY)
    return addressRepository.getOne(where)
  }
}

const Subscription = {}

export default { Mutation, Query, Subscription }
