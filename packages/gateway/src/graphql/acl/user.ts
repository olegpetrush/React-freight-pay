import { isNil } from "lodash";

const Mutation = {
  updateUser: ({ id, role }: any) => {
    const permissions: any = {
      admin: {},
      regular: { id },
    };
    return !isNil(role.name)
      ? permissions[`${role.name}`]
      : permissions.regular;
  },
};

export default { Mutation };
