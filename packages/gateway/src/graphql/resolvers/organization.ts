import cuid from 'cuid'
import { isNil, map, uniqBy } from 'lodash'

import { ORGANIZATION_ROLES, DEPENDENCIES } from '../../utils/constants'

const Mutation = {
  createOrganization: async (
    _: any,
    { data }: any,
    { container, user }: any
  ) => {
    const organizationRepository = container.get(
      DEPENDENCIES.ORGANIZATION_REPOSITORY
    )
    const userToOrganizationRepository = container.get(
      DEPENDENCIES.USER_TO_ORGANIZATION_REPOSITORY
    )

    const { alias } = data
    const organizationWithAlias = await organizationRepository.getOne({
      alias
    })
    if (!isNil(organizationWithAlias))
      return new Error('This alias already exists')

    const organizationId = cuid()
    const organizationData = {
      id: organizationId,
      ...data
    }
    const userToOrganizationData = {
      id: cuid(),
      role: ORGANIZATION_ROLES.OWNER,
      user: {
        id: user.id
      },
      organization: {
        id: organizationId
      }
    }

    await organizationRepository.create(organizationData)
    await userToOrganizationRepository.create(userToOrganizationData)

    return organizationRepository.getOne({ id: organizationId })
  },
  updateOrganization: (_: any, { where, data }: any, context: any) => {
    const { container, user } = context
    const { id } = user
    const organizationRepository = container.get(
      DEPENDENCIES.ORGANIZATION_REPOSITORY
    )
    const updateWhere = isNil(where) ? { id } : where
    return organizationRepository.update(updateWhere, data)
  }
}

const Query = {
  myOrganizations: async (_: any, __: any, { user, container }: any) => {
    const userToOrganizationRepository = container.get(
      DEPENDENCIES.USER_TO_ORGANIZATION_REPOSITORY
    )
    const userToOrganizations = await userToOrganizationRepository.get({
      user,
      take: 1000
    })
    const { data } = userToOrganizations
    const organizations = uniqBy(map(data, 'organization'), 'id')
    return {
      data: organizations,
      count: organizations.length
    }
  },
  organizations: async (_: any, { where }: any, { container }: any) => {
    const organizationRepository = container.get(
      DEPENDENCIES.ORGANIZATION_REPOSITORY
    )
    const organizations = await organizationRepository.get(where)
    return organizations
  },
  organization: async (_: any, { where }: any, { container }: any) => {
    const organizationRepository = container.get(
      DEPENDENCIES.ORGANIZATION_REPOSITORY
    )
    const organization = await organizationRepository.getOne(where)
    organization.members = {
      data: organization.userToOrganizations,
      count: organization.userToOrganizations.length
    }
    return organization
  }
}

const Subscription = {}

export default { Mutation, Query, Subscription }
