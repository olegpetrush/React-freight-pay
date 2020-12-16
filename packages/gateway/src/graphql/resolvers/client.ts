import cuid from 'cuid'
import { isNil } from 'lodash'

import { DEPENDENCIES } from '../../utils/constants'

const Mutation = {
  createClient: (_: any, { data }: any, { user, container }: any) => {
    const clientRepository = container.get(DEPENDENCIES.CLIENT_REPOSITORY)
    const { organizationId, name } = data
    const { id: userId } = user
    const id = cuid()
    const clientData = {
      ...data,
      id,
      organization: { id: organizationId },
      createdBy: { id: userId },
      name
    }
    return clientRepository.create(clientData)
  },
  updateClient: (_: any, { where, data }: any, context: any) => {
    const { container, user } = context
    const { id } = user
    const clientRepository = container.get(DEPENDENCIES.CLIENT_REPOSITORY)
    const updateWhere = isNil(where) ? { id } : where
    return clientRepository.update(updateWhere, data)
  }
}

const Query = {
  clients: (_: any, { where }: any, { container }: any) => {
    const clientRepository = container.get(DEPENDENCIES.CLIENT_REPOSITORY)
    return clientRepository.get(where)
  },
  client: (_: any, { where }: any, { container }: any) => {
    const clientRepository = container.get(DEPENDENCIES.CLIENT_REPOSITORY)
    return clientRepository.getOne(where)
  }
}

const Subscription = {}

export default { Mutation, Query, Subscription }
