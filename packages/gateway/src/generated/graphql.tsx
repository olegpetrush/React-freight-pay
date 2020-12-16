import { GraphQLResolveInfo } from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
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

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>
  ID: ResolverTypeWrapper<Scalars['ID']>
  String: ResolverTypeWrapper<Scalars['String']>
  Addresses: ResolverTypeWrapper<Addresses>
  Int: ResolverTypeWrapper<Scalars['Int']>
  AddressInput: AddressInput
  AddressWhereUniqueInput: AddressWhereUniqueInput
  AddressWhereInput: AddressWhereInput
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  Subscription: ResolverTypeWrapper<{}>
  Client: ResolverTypeWrapper<Client>
  Clients: ResolverTypeWrapper<Clients>
  ClientInput: ClientInput
  ClientWhereUniqueInput: ClientWhereUniqueInput
  ClientWhereInput: ClientWhereInput
  Contact: ResolverTypeWrapper<Contact>
  Contacts: ResolverTypeWrapper<Contacts>
  ContactWhereUniqueInput: ContactWhereUniqueInput
  ContactWhereInput: ContactWhereInput
  ControllerContact: ResolverTypeWrapper<ControllerContact>
  ControllerContacts: ResolverTypeWrapper<ControllerContacts>
  ControllerContactInput: ControllerContactInput
  ControllerContactWhereUniqueInput: ControllerContactWhereUniqueInput
  ControllerContactWhereInput: ControllerContactWhereInput
  DwollaCustomer: ResolverTypeWrapper<DwollaCustomer>
  Organization: ResolverTypeWrapper<Organization>
  Organizations: ResolverTypeWrapper<Organizations>
  OrganizationInput: OrganizationInput
  OrganizationWhereUniqueInput: OrganizationWhereUniqueInput
  OrganizationWhereInput: OrganizationWhereInput
  PaymentRequest: ResolverTypeWrapper<PaymentRequest>
  Float: ResolverTypeWrapper<Scalars['Float']>
  PaymentRequests: ResolverTypeWrapper<PaymentRequests>
  PaymentRequestContactInput: PaymentRequestContactInput
  PaymentRequestInput: PaymentRequestInput
  PaymentRequestWhereUniqueInput: PaymentRequestWhereUniqueInput
  PaymentRequestWhereInput: PaymentRequestWhereInput
  User: ResolverTypeWrapper<User>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Users: ResolverTypeWrapper<Users>
  UserWhereUniqueInput: UserWhereUniqueInput
  UserWhereInput: UserWhereInput
  UserToOrganization: ResolverTypeWrapper<UserToOrganization>
  UserToOrganizations: ResolverTypeWrapper<UserToOrganizations>
  UserToOrganizationWhereUniqueInput: UserToOrganizationWhereUniqueInput
  UserToOrganizationWhereInput: UserToOrganizationWhereInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address
  ID: Scalars['ID']
  String: Scalars['String']
  Addresses: Addresses
  Int: Scalars['Int']
  AddressInput: AddressInput
  AddressWhereUniqueInput: AddressWhereUniqueInput
  AddressWhereInput: AddressWhereInput
  Mutation: {}
  Query: {}
  Subscription: {}
  Client: Client
  Clients: Clients
  ClientInput: ClientInput
  ClientWhereUniqueInput: ClientWhereUniqueInput
  ClientWhereInput: ClientWhereInput
  Contact: Contact
  Contacts: Contacts
  ContactWhereUniqueInput: ContactWhereUniqueInput
  ContactWhereInput: ContactWhereInput
  ControllerContact: ControllerContact
  ControllerContacts: ControllerContacts
  ControllerContactInput: ControllerContactInput
  ControllerContactWhereUniqueInput: ControllerContactWhereUniqueInput
  ControllerContactWhereInput: ControllerContactWhereInput
  DwollaCustomer: DwollaCustomer
  Organization: Organization
  Organizations: Organizations
  OrganizationInput: OrganizationInput
  OrganizationWhereUniqueInput: OrganizationWhereUniqueInput
  OrganizationWhereInput: OrganizationWhereInput
  PaymentRequest: PaymentRequest
  Float: Scalars['Float']
  PaymentRequests: PaymentRequests
  PaymentRequestContactInput: PaymentRequestContactInput
  PaymentRequestInput: PaymentRequestInput
  PaymentRequestWhereUniqueInput: PaymentRequestWhereUniqueInput
  PaymentRequestWhereInput: PaymentRequestWhereInput
  User: User
  Boolean: Scalars['Boolean']
  Users: Users
  UserWhereUniqueInput: UserWhereUniqueInput
  UserWhereInput: UserWhereInput
  UserToOrganization: UserToOrganization
  UserToOrganizations: UserToOrganizations
  UserToOrganizationWhereUniqueInput: UserToOrganizationWhereUniqueInput
  UserToOrganizationWhereInput: UserToOrganizationWhereInput
}

export type AddressResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  address1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  address3?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  stateProvinceRegion?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  postalCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  client?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type AddressesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Addresses'] = ResolversParentTypes['Addresses']
> = {
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Address']>>>,
    ParentType,
    ContextType
  >
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createClient?: Resolver<
    Maybe<ResolversTypes['Client']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateClientArgs, never>
  >
  createControllerContact?: Resolver<
    Maybe<ResolversTypes['ControllerContact']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateControllerContactArgs, never>
  >
  createOrganization?: Resolver<
    Maybe<ResolversTypes['Organization']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateOrganizationArgs, never>
  >
  createPaymentRequest?: Resolver<
    Maybe<ResolversTypes['PaymentRequest']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreatePaymentRequestArgs, never>
  >
  updateAddress?: Resolver<
    Maybe<ResolversTypes['Address']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAddressArgs, never>
  >
  updateClient?: Resolver<
    Maybe<ResolversTypes['Client']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateClientArgs, never>
  >
  updateContact?: Resolver<
    Maybe<ResolversTypes['Contact']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateContactArgs, never>
  >
  updateControllerContact?: Resolver<
    Maybe<ResolversTypes['ControllerContact']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateControllerContactArgs, never>
  >
  updateOrganization?: Resolver<
    Maybe<ResolversTypes['Organization']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateOrganizationArgs, never>
  >
  updatePaymentRequest?: Resolver<
    Maybe<ResolversTypes['PaymentRequest']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePaymentRequestArgs, never>
  >
  updateUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, never>
  >
  updateUserToOrganization?: Resolver<
    Maybe<ResolversTypes['UserToOrganization']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserToOrganizationArgs, never>
  >
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  address?: Resolver<
    Maybe<ResolversTypes['Address']>,
    ParentType,
    ContextType,
    RequireFields<QueryAddressArgs, never>
  >
  addresses?: Resolver<
    Maybe<ResolversTypes['Addresses']>,
    ParentType,
    ContextType,
    RequireFields<QueryAddressesArgs, never>
  >
  client?: Resolver<
    Maybe<ResolversTypes['Client']>,
    ParentType,
    ContextType,
    RequireFields<QueryClientArgs, never>
  >
  clients?: Resolver<
    Maybe<ResolversTypes['Clients']>,
    ParentType,
    ContextType,
    RequireFields<QueryClientsArgs, never>
  >
  contact?: Resolver<
    Maybe<ResolversTypes['Contact']>,
    ParentType,
    ContextType,
    RequireFields<QueryContactArgs, never>
  >
  contacts?: Resolver<
    Maybe<ResolversTypes['Contacts']>,
    ParentType,
    ContextType,
    RequireFields<QueryContactsArgs, never>
  >
  controllerContact?: Resolver<
    Maybe<ResolversTypes['ControllerContact']>,
    ParentType,
    ContextType,
    RequireFields<QueryControllerContactArgs, never>
  >
  controllerContacts?: Resolver<
    Maybe<ResolversTypes['ControllerContacts']>,
    ParentType,
    ContextType,
    RequireFields<QueryControllerContactsArgs, never>
  >
  dwollaCustomerByUser?: Resolver<
    Maybe<ResolversTypes['DwollaCustomer']>,
    ParentType,
    ContextType,
    RequireFields<QueryDwollaCustomerByUserArgs, never>
  >
  myAddresses?: Resolver<
    Maybe<ResolversTypes['Addresses']>,
    ParentType,
    ContextType,
    RequireFields<QueryMyAddressesArgs, never>
  >
  myOrganizations?: Resolver<
    Maybe<ResolversTypes['Organizations']>,
    ParentType,
    ContextType,
    RequireFields<QueryMyOrganizationsArgs, never>
  >
  myPaymentRequests?: Resolver<
    Maybe<ResolversTypes['PaymentRequests']>,
    ParentType,
    ContextType,
    RequireFields<QueryMyPaymentRequestsArgs, never>
  >
  myUserToOrganizations?: Resolver<
    Maybe<ResolversTypes['UserToOrganizations']>,
    ParentType,
    ContextType,
    RequireFields<QueryMyUserToOrganizationsArgs, never>
  >
  organization?: Resolver<
    Maybe<ResolversTypes['Organization']>,
    ParentType,
    ContextType,
    RequireFields<QueryOrganizationArgs, never>
  >
  organizations?: Resolver<
    Maybe<ResolversTypes['Organizations']>,
    ParentType,
    ContextType,
    RequireFields<QueryOrganizationsArgs, never>
  >
  paymentRequest?: Resolver<
    Maybe<ResolversTypes['PaymentRequest']>,
    ParentType,
    ContextType,
    RequireFields<QueryPaymentRequestArgs, never>
  >
  paymentRequests?: Resolver<
    Maybe<ResolversTypes['PaymentRequests']>,
    ParentType,
    ContextType,
    RequireFields<QueryPaymentRequestsArgs, never>
  >
  profile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, never>
  >
  userToOrganization?: Resolver<
    Maybe<ResolversTypes['UserToOrganization']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserToOrganizationArgs, never>
  >
  userToOrganizations?: Resolver<
    Maybe<ResolversTypes['UserToOrganizations']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserToOrganizationsArgs, never>
  >
  users?: Resolver<
    Maybe<ResolversTypes['Users']>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersArgs, never>
  >
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  addressUpdated?: SubscriptionResolver<
    Maybe<ResolversTypes['Address']>,
    'addressUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionAddressUpdatedArgs, never>
  >
  clientUpdated?: SubscriptionResolver<
    Maybe<ResolversTypes['Client']>,
    'clientUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionClientUpdatedArgs, never>
  >
  contactUpdated?: SubscriptionResolver<
    Maybe<ResolversTypes['Contact']>,
    'contactUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionContactUpdatedArgs, never>
  >
  controllerContactUpdated?: SubscriptionResolver<
    Maybe<ResolversTypes['ControllerContact']>,
    'controllerContactUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionControllerContactUpdatedArgs, never>
  >
  organizationUpdated?: SubscriptionResolver<
    Maybe<ResolversTypes['Organization']>,
    'organizationUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionOrganizationUpdatedArgs, never>
  >
  paymentRequestUpdated?: SubscriptionResolver<
    Maybe<ResolversTypes['PaymentRequest']>,
    'paymentRequestUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionPaymentRequestUpdatedArgs, never>
  >
  userToOrganizationUpdated?: SubscriptionResolver<
    Maybe<ResolversTypes['UserToOrganization']>,
    'userToOrganizationUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionUserToOrganizationUpdatedArgs, never>
  >
  userUpdated?: SubscriptionResolver<
    Maybe<ResolversTypes['User']>,
    'userUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionUserUpdatedArgs, never>
  >
}

export type ClientResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  organization?: Resolver<
    Maybe<ResolversTypes['Organization']>,
    ParentType,
    ContextType
  >
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ClientsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Clients'] = ResolversParentTypes['Clients']
> = {
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Client']>>>,
    ParentType,
    ContextType
  >
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ContactResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ContactsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Contacts'] = ResolversParentTypes['Contacts']
> = {
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Contact']>>>,
    ParentType,
    ContextType
  >
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ControllerContactResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ControllerContact'] = ResolversParentTypes['ControllerContact']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>
  ssn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  dateOfBirth?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  organization?: Resolver<
    Maybe<ResolversTypes['Organization']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ControllerContactsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ControllerContacts'] = ResolversParentTypes['ControllerContacts']
> = {
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ControllerContact']>>>,
    ParentType,
    ContextType
  >
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DwollaCustomerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DwollaCustomer'] = ResolversParentTypes['DwollaCustomer']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  created?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  correlationId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type OrganizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  userToOrganizations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['UserToOrganization']>>>,
    ParentType,
    ContextType
  >
  members?: Resolver<
    Maybe<ResolversTypes['UserToOrganizations']>,
    ParentType,
    ContextType
  >
  clients?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Client']>>>,
    ParentType,
    ContextType
  >
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>
  controller?: Resolver<
    Maybe<ResolversTypes['ControllerContact']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type OrganizationsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Organizations'] = ResolversParentTypes['Organizations']
> = {
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Organization']>>>,
    ParentType,
    ContextType
  >
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PaymentRequestResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaymentRequest'] = ResolversParentTypes['PaymentRequest']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  invoiceNumber?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  dueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  organization?: Resolver<
    Maybe<ResolversTypes['Organization']>,
    ParentType,
    ContextType
  >
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  client?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType>
  contacts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Contact']>>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PaymentRequestsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaymentRequests'] = ResolversParentTypes['PaymentRequests']
> = {
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['PaymentRequest']>>>,
    ParentType,
    ContextType
  >
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  auth0UserId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  emailVerified?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  organizations?: Resolver<
    Maybe<ResolversTypes['Organizations']>,
    ParentType,
    ContextType
  >
  userToOrganizations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['UserToOrganization']>>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UsersResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Users'] = ResolversParentTypes['Users']
> = {
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType
  >
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserToOrganizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserToOrganization'] = ResolversParentTypes['UserToOrganization']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  organization?: Resolver<
    Maybe<ResolversTypes['Organization']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserToOrganizationsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserToOrganizations'] = ResolversParentTypes['UserToOrganizations']
> = {
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['UserToOrganization']>>>,
    ParentType,
    ContextType
  >
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>
  Addresses?: AddressesResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  Client?: ClientResolvers<ContextType>
  Clients?: ClientsResolvers<ContextType>
  Contact?: ContactResolvers<ContextType>
  Contacts?: ContactsResolvers<ContextType>
  ControllerContact?: ControllerContactResolvers<ContextType>
  ControllerContacts?: ControllerContactsResolvers<ContextType>
  DwollaCustomer?: DwollaCustomerResolvers<ContextType>
  Organization?: OrganizationResolvers<ContextType>
  Organizations?: OrganizationsResolvers<ContextType>
  PaymentRequest?: PaymentRequestResolvers<ContextType>
  PaymentRequests?: PaymentRequestsResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Users?: UsersResolvers<ContextType>
  UserToOrganization?: UserToOrganizationResolvers<ContextType>
  UserToOrganizations?: UserToOrganizationsResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
