import { isNil } from 'lodash'

import { DEPENDENCIES } from '../../utils/constants'

const Mutation = {
  updateContact: (_: any, { where, data }: any, context: any) => {
    const { container, user } = context
    const { id } = user
    const contactRepository = container.get(DEPENDENCIES.CONTACT_REPOSITORY)
    const updateWhere = isNil(where) ? { id } : where
    return contactRepository.update(updateWhere, data)
  }
}

const Query = {
  contacts: (_: any, { where }: any, { container }: any) => {
    const contactRepository = container.get(DEPENDENCIES.CONTACT_REPOSITORY)
    return contactRepository.get(where)
  },
  contact: (_: any, { where }: any, { container }: any) => {
    const contactRepository = container.get(DEPENDENCIES.CONTACT_REPOSITORY)
    return contactRepository.getOne(where)
  }
}

const Subscription = {}

export default { Mutation, Query, Subscription }
