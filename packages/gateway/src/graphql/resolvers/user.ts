import { isNil } from "lodash";

import { DEPENDENCIES } from "../../utils/constants";

const Mutation = {
  updateUser: (_: any, { where, data }: any, context: any) => {
    const { container, user } = context;
    const { id } = user;
    const userRepository = container.get(DEPENDENCIES.USER_REPOSITORY);
    const updateWhere = isNil(where) ? { id } : where;
    return userRepository.update(updateWhere, data);
  },
};

const Query = {
  users: (_: any, { where }: any, { container }: any) => {
    const userRepository = container.get(DEPENDENCIES.USER_REPOSITORY);
    return userRepository.get(where);
  },
  user: async (_: any, { where }: any, { container }: any) => {
    const userRepository = container.get(DEPENDENCIES.USER_REPOSITORY);
    const user = await userRepository.getOne(where);
    const { userToOrganizations } = user;
    const organizations = userToOrganizations.map((uto: any) => ({
      ...uto.organization,
      role: uto.role,
    }));
    user.organizations = {
      data: organizations,
      count: organizations.length,
    };
    return user;
  },
  dwollaCustomerByUser: async (_: any, { where }: any, { container }: any) => {
    const dwollaService = container.get(DEPENDENCIES.DWOLLA_SERVICE);
    const userRepository = container.get(DEPENDENCIES.USER_REPOSITORY);
    const user = await userRepository.getOne(where);
    const { dwollaCustomerId } = user;

    dwollaService.setUser(user);
    const customer = await dwollaService.customer.get(dwollaCustomerId);

    return customer.body;
  },
  profile: (_: any, __: any, { user }: any) => {
    const { userToOrganizations } = user;
    const organizations = userToOrganizations.map((uto: any) => ({
      ...uto.organization,
      role: uto.role,
    }));
    user.organizations = {
      data: organizations,
      count: organizations.length,
    };
    return user;
  },
};

const Subscription = {};

export default { Mutation, Query, Subscription };
