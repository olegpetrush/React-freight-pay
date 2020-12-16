import { isNil } from 'lodash'

import { DEPENDENCIES } from '../../utils/constants'

const Mutation = {
  updateUserToOrganization: (_: any, { where, data }: any, context: any) => {
    const { container, user } = context
    const { id } = user
    const userToOrganizationRepository = container.get(
      DEPENDENCIES.USER_TO_ORGANIZATION_REPOSITORY
    )
    const updateWhere = isNil(where) ? { id } : where
    return userToOrganizationRepository.update(updateWhere, data)
  }
}

const Query = {
  userToOrganizations: (_: any, { where }: any, { container }: any) => {
    const userToOrganizationRepository = container.get(
      DEPENDENCIES.USER_TO_ORGANIZATION_REPOSITORY
    )
    return userToOrganizationRepository.get(where)
  },
  userToOrganization: (_: any, { where }: any, { container }: any) => {
    const userToOrganizationRepository = container.get(
      DEPENDENCIES.USER_TO_ORGANIZATION_REPOSITORY
    )
    return userToOrganizationRepository.getOne(where)
  }
}

const Subscription = {}

export default { Mutation, Query, Subscription }
