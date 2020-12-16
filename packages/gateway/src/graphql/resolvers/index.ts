import { applyAcl } from '../acl'

import user from './user'
import organization from './organization'
import userToOrganization from './userToOrganization'
import client from './client'
import address from './address'
import contact from './contact'
import controllerContact from './controllerContact'
import paymentRequest from './paymentRequest'

const resolvers = [
  user,
  organization,
  userToOrganization,
  client,
  address,
  contact,
  controllerContact,
  paymentRequest
]

export default applyAcl(resolvers)
