export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Address = {
  __typename?: 'Address'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  address1?: Maybe<Scalars['String']>
  address2?: Maybe<Scalars['String']>
  address3?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  stateProvinceRegion?: Maybe<Scalars['String']>
  postalCode?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
  user?: Maybe<User>
  client?: Maybe<Client>
}

export type Addresses = {
  __typename?: 'Addresses'
  data?: Maybe<Array<Maybe<Address>>>
  count?: Maybe<Scalars['Int']>
}

export type AddressInput = {
  name?: Maybe<Scalars['String']>
  address1?: Maybe<Scalars['String']>
  address2?: Maybe<Scalars['String']>
  address3?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  stateProvinceRegion?: Maybe<Scalars['String']>
  postalCode?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
}

export type AddressWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
}

export type AddressWhereInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createClient?: Maybe<Client>
  createControllerContact?: Maybe<ControllerContact>
  createOrganization?: Maybe<Organization>
  createPaymentRequest?: Maybe<PaymentRequest>
  updateAddress?: Maybe<Address>
  updateClient?: Maybe<Client>
  updateContact?: Maybe<Contact>
  updateControllerContact?: Maybe<ControllerContact>
  updateOrganization?: Maybe<Organization>
  updatePaymentRequest?: Maybe<PaymentRequest>
  updateUser?: Maybe<User>
  updateUserToOrganization?: Maybe<UserToOrganization>
}

export type MutationCreateClientArgs = {
  data?: Maybe<ClientInput>
}

export type MutationCreateControllerContactArgs = {
  data?: Maybe<ControllerContactInput>
}

export type MutationCreateOrganizationArgs = {
  data?: Maybe<OrganizationInput>
}

export type MutationCreatePaymentRequestArgs = {
  data?: Maybe<PaymentRequestInput>
}

export type MutationUpdateAddressArgs = {
  where?: Maybe<AddressWhereUniqueInput>
  data?: Maybe<AddressWhereInput>
}

export type MutationUpdateClientArgs = {
  where?: Maybe<ClientWhereUniqueInput>
  data?: Maybe<ClientWhereInput>
}

export type MutationUpdateContactArgs = {
  where?: Maybe<ContactWhereUniqueInput>
  data?: Maybe<ContactWhereInput>
}

export type MutationUpdateControllerContactArgs = {
  where?: Maybe<ControllerContactWhereUniqueInput>
  data?: Maybe<ControllerContactWhereInput>
}

export type MutationUpdateOrganizationArgs = {
  where?: Maybe<OrganizationWhereUniqueInput>
  data?: Maybe<OrganizationWhereInput>
}

export type MutationUpdatePaymentRequestArgs = {
  where?: Maybe<PaymentRequestWhereUniqueInput>
  data?: Maybe<PaymentRequestWhereInput>
}

export type MutationUpdateUserArgs = {
  where?: Maybe<UserWhereUniqueInput>
  data?: Maybe<UserWhereInput>
}

export type MutationUpdateUserToOrganizationArgs = {
  where?: Maybe<UserToOrganizationWhereUniqueInput>
  data?: Maybe<UserToOrganizationWhereInput>
}

export type Query = {
  __typename?: 'Query'
  address?: Maybe<Address>
  addresses?: Maybe<Addresses>
  client?: Maybe<Client>
  clients?: Maybe<Clients>
  contact?: Maybe<Contact>
  contacts?: Maybe<Contacts>
  controllerContact?: Maybe<ControllerContact>
  controllerContacts?: Maybe<ControllerContacts>
  dwollaCustomerByUser?: Maybe<DwollaCustomer>
  myAddresses?: Maybe<Addresses>
  myOrganizations?: Maybe<Organizations>
  myPaymentRequests?: Maybe<PaymentRequests>
  myUserToOrganizations?: Maybe<UserToOrganizations>
  organization?: Maybe<Organization>
  organizations?: Maybe<Organizations>
  paymentRequest?: Maybe<PaymentRequest>
  paymentRequests?: Maybe<PaymentRequests>
  profile?: Maybe<User>
  user?: Maybe<User>
  userToOrganization?: Maybe<UserToOrganization>
  userToOrganizations?: Maybe<UserToOrganizations>
  users?: Maybe<Users>
}

export type QueryAddressArgs = {
  where?: Maybe<AddressWhereUniqueInput>
}

export type QueryAddressesArgs = {
  where?: Maybe<AddressWhereInput>
}

export type QueryClientArgs = {
  where?: Maybe<ClientWhereUniqueInput>
}

export type QueryClientsArgs = {
  where?: Maybe<ClientWhereInput>
}

export type QueryContactArgs = {
  where?: Maybe<ContactWhereUniqueInput>
}

export type QueryContactsArgs = {
  where?: Maybe<ContactWhereInput>
}

export type QueryControllerContactArgs = {
  where?: Maybe<ControllerContactWhereUniqueInput>
}

export type QueryControllerContactsArgs = {
  where?: Maybe<ControllerContactWhereInput>
}

export type QueryDwollaCustomerByUserArgs = {
  where?: Maybe<UserWhereUniqueInput>
}

export type QueryMyAddressesArgs = {
  where?: Maybe<AddressWhereInput>
}

export type QueryMyOrganizationsArgs = {
  where?: Maybe<OrganizationWhereInput>
}

export type QueryMyPaymentRequestsArgs = {
  where?: Maybe<PaymentRequestWhereInput>
}

export type QueryMyUserToOrganizationsArgs = {
  where?: Maybe<UserToOrganizationWhereInput>
}

export type QueryOrganizationArgs = {
  where?: Maybe<OrganizationWhereUniqueInput>
}

export type QueryOrganizationsArgs = {
  where?: Maybe<OrganizationWhereInput>
}

export type QueryPaymentRequestArgs = {
  where?: Maybe<PaymentRequestWhereUniqueInput>
}

export type QueryPaymentRequestsArgs = {
  where?: Maybe<PaymentRequestWhereInput>
}

export type QueryUserArgs = {
  where?: Maybe<UserWhereUniqueInput>
}

export type QueryUserToOrganizationArgs = {
  where?: Maybe<UserToOrganizationWhereUniqueInput>
}

export type QueryUserToOrganizationsArgs = {
  where?: Maybe<UserToOrganizationWhereInput>
}

export type QueryUsersArgs = {
  where?: Maybe<UserWhereInput>
}

export type Subscription = {
  __typename?: 'Subscription'
  addressUpdated?: Maybe<Address>
  clientUpdated?: Maybe<Client>
  contactUpdated?: Maybe<Contact>
  controllerContactUpdated?: Maybe<ControllerContact>
  organizationUpdated?: Maybe<Organization>
  paymentRequestUpdated?: Maybe<PaymentRequest>
  userToOrganizationUpdated?: Maybe<UserToOrganization>
  userUpdated?: Maybe<User>
}

export type SubscriptionAddressUpdatedArgs = {
  where?: Maybe<AddressWhereInput>
}

export type SubscriptionClientUpdatedArgs = {
  where?: Maybe<ClientWhereInput>
}

export type SubscriptionContactUpdatedArgs = {
  where?: Maybe<ContactWhereInput>
}

export type SubscriptionControllerContactUpdatedArgs = {
  where?: Maybe<ControllerContactWhereInput>
}

export type SubscriptionOrganizationUpdatedArgs = {
  where?: Maybe<OrganizationWhereInput>
}

export type SubscriptionPaymentRequestUpdatedArgs = {
  where?: Maybe<PaymentRequestWhereInput>
}

export type SubscriptionUserToOrganizationUpdatedArgs = {
  where?: Maybe<UserToOrganizationWhereInput>
}

export type SubscriptionUserUpdatedArgs = {
  where?: Maybe<UserWhereInput>
}

export type Client = {
  __typename?: 'Client'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
  createdBy?: Maybe<User>
  organization?: Maybe<Organization>
  address?: Maybe<Address>
}

export type Clients = {
  __typename?: 'Clients'
  data?: Maybe<Array<Maybe<Client>>>
  count?: Maybe<Scalars['Int']>
}

export type ClientInput = {
  organizationId: Scalars['ID']
  name?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
}

export type ClientWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
}

export type ClientWhereInput = {
  id?: Maybe<Scalars['ID']>
  organization?: Maybe<OrganizationWhereInput>
  take?: Maybe<Scalars['Int']>
  skip?: Maybe<Scalars['Int']>
}

export type Contact = {
  __typename?: 'Contact'
  id: Scalars['ID']
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
  address?: Maybe<Address>
}

export type Contacts = {
  __typename?: 'Contacts'
  data?: Maybe<Array<Maybe<Contact>>>
  count?: Maybe<Scalars['Int']>
}

export type ContactWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
}

export type ContactWhereInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
}

export type ControllerContact = {
  __typename?: 'ControllerContact'
  id: Scalars['ID']
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
  address?: Maybe<Address>
  ssn?: Maybe<Scalars['String']>
  dateOfBirth?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  organization?: Maybe<Organization>
}

export type ControllerContacts = {
  __typename?: 'ControllerContacts'
  data?: Maybe<Array<Maybe<ControllerContact>>>
  count?: Maybe<Scalars['Int']>
}

export type ControllerContactInput = {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
  ssn?: Maybe<Scalars['String']>
  dateOfBirth?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  organization?: Maybe<OrganizationWhereUniqueInput>
  address?: Maybe<AddressInput>
}

export type ControllerContactWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
}

export type ControllerContactWhereInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
}

export type DwollaCustomer = {
  __typename?: 'DwollaCustomer'
  id: Scalars['ID']
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  created?: Maybe<Scalars['String']>
  correlationId?: Maybe<Scalars['String']>
}

export type Organization = {
  __typename?: 'Organization'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  alias?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
  userToOrganizations?: Maybe<Array<Maybe<UserToOrganization>>>
  members?: Maybe<UserToOrganizations>
  clients?: Maybe<Array<Maybe<Client>>>
  address?: Maybe<Address>
  controller?: Maybe<ControllerContact>
}

export type Organizations = {
  __typename?: 'Organizations'
  data?: Maybe<Array<Maybe<Organization>>>
  count?: Maybe<Scalars['Int']>
}

export type OrganizationInput = {
  name: Scalars['String']
  alias?: Maybe<Scalars['String']>
  address?: Maybe<AddressInput>
  controller?: Maybe<ControllerContactInput>
}

export type OrganizationWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  alias?: Maybe<Scalars['String']>
}

export type OrganizationWhereInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  alias?: Maybe<Scalars['String']>
}

export type PaymentRequest = {
  __typename?: 'PaymentRequest'
  id: Scalars['ID']
  description?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Float']>
  invoiceNumber?: Maybe<Scalars['String']>
  dueDate?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
  organization?: Maybe<Organization>
  createdBy?: Maybe<User>
  client?: Maybe<Client>
  contacts?: Maybe<Array<Maybe<Contact>>>
}

export type PaymentRequests = {
  __typename?: 'PaymentRequests'
  data?: Maybe<Array<Maybe<PaymentRequest>>>
  count?: Maybe<Scalars['Int']>
}

export type PaymentRequestContactInput = {
  id?: Maybe<Scalars['ID']>
}

export type PaymentRequestInput = {
  description?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Float']>
  invoiceNumber?: Maybe<Scalars['String']>
  dueDate?: Maybe<Scalars['String']>
  organizationId?: Maybe<Scalars['String']>
  clientId?: Maybe<Scalars['String']>
  contacts?: Maybe<Array<Maybe<PaymentRequestContactInput>>>
}

export type PaymentRequestWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
}

export type PaymentRequestWhereInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  auth0UserId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  emailVerified?: Maybe<Scalars['Boolean']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  fullName?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
  organizations?: Maybe<Organizations>
  userToOrganizations?: Maybe<Array<Maybe<UserToOrganization>>>
}

export type Users = {
  __typename?: 'Users'
  data?: Maybe<Array<Maybe<User>>>
  count?: Maybe<Scalars['Int']>
}

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type UserWhereInput = {
  id?: Maybe<Scalars['ID']>
}

export type UserToOrganization = {
  __typename?: 'UserToOrganization'
  id: Scalars['ID']
  role?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
  user?: Maybe<User>
  organization?: Maybe<Organization>
}

export type UserToOrganizations = {
  __typename?: 'UserToOrganizations'
  data?: Maybe<Array<Maybe<UserToOrganization>>>
  count?: Maybe<Scalars['Int']>
}

export type UserToOrganizationWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  role?: Maybe<Scalars['String']>
}

export type UserToOrganizationWhereInput = {
  id?: Maybe<Scalars['ID']>
  user?: Maybe<UserWhereInput>
}
