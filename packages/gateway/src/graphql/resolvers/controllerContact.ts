import cuid from 'cuid'
import { isNil } from 'lodash'

import { DEPENDENCIES } from '../../utils/constants'

const Mutation = {
  createControllerContact: async (
    _: any,
    { data }: any,
    { container }: any
  ) => {
    const controllerContactRepository = container.get(
      DEPENDENCIES.CONTROLLER_CONTACT_REPOSITORY
    )
    const addressRepository = container.get(DEPENDENCIES.ADDRESS_REPOSITORY)
    // const { id: userId } = user;
    const id = cuid()
    const controllerContactData = {
      ...data,
      id
      // createdBy: { id: userId },
    }
    if (
      !isNil(controllerContactData.address) &&
      isNil(controllerContactData.address.id)
    ) {
      const newAddress = await addressRepository.create({
        id: cuid(),
        ...controllerContactData.address
      })
      const { id: addressId } = newAddress
      controllerContactData.address = {
        id: addressId
      }
    }
    return controllerContactRepository.create(controllerContactData)
  },
  updateControllerContact: (_: any, { where, data }: any, context: any) => {
    const { container, user } = context
    const { id } = user
    const controllerContactRepository = container.get(
      DEPENDENCIES.CONTROLLER_CONTACT_REPOSITORY
    )
    const updateWhere = isNil(where) ? { id } : where
    return controllerContactRepository.update(updateWhere, data)
  }
}

const Query = {
  controllerContacts: async (_: any, { where }: any, { container }: any) => {
    const controllerContactRepository = container.get(
      DEPENDENCIES.CONTROLLER_CONTACT_REPOSITORY
    )
    const results = await controllerContactRepository.get(where)
    console.log('results', results)
    return results
  },
  controllerContact: (_: any, { where }: any, { container }: any) => {
    const controllerContactRepository = container.get(
      DEPENDENCIES.CONTROLLER_CONTACT_REPOSITORY
    )
    return controllerContactRepository.getOne(where)
  }
}

const Subscription = {}

export default { Mutation, Query, Subscription }
