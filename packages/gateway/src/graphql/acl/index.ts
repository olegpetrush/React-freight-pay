import { get } from "lodash";
import user from "./user";

const accessLists = {
  ...user.Mutation,
};

const applyQueryAcl = (Query: any) =>
  Object.keys(Query).reduce((accumulator: any, key: any) => {
    accumulator[`${key}`] = (
      _: any,
      { where, ...rest }: any,
      { user, ...left }: any
    ) => {
      const accessList = get(accessLists, `${key}`, () => {})(user);
      return Query[`${key}`](
        _,
        { where: { ...where, ...accessList }, ...rest },
        { user, ...left }
      );
    };
    return accumulator;
  }, {});

const applyMutationAcl = (Mutation: any) =>
  Object.keys(Mutation).reduce((accumulator: any, key: any) => {
    accumulator[`${key}`] = (
      _: any,
      { where = {}, ...rest }: any,
      { user, ...left }: any
    ) => {
      const accessList = get(accessLists, `${key}`, () => {})(user);
      return Mutation[`${key}`](
        _,
        { where: { ...where, ...accessList }, ...rest },
        { user, ...left }
      );
    };
    return accumulator;
  }, {});

const applySubscriptionAcl = (Subscription: any) =>
  Object.keys(Subscription).reduce((accumulator: any, key: any) => {
    accumulator[`${key}`] = (
      _: any,
      { where, ...rest }: any,
      { user, ...left }: any
    ) => {
      const accessList = get(accessLists, `${key}`, () => {})(user);
      return Subscription[`${key}`](
        _,
        { where: { ...where, ...accessList }, ...rest },
        { user, ...left }
      );
    };
    return accumulator;
  }, {});

const appliers = {
  Query: applyQueryAcl,
  Mutation: applyMutationAcl,
  Subscription: applySubscriptionAcl,
};

export const applyAcl = (resolvers: any) =>
  resolvers.map(
    ({
      Query = {},
      Mutation = {},
      Subscription = {},
    }: { Query?: object; Mutation?: object; Subscription?: object } = {}) => ({
      Query: appliers["Query"](Query),
      Mutation: appliers["Mutation"](Mutation),
      Subscription: appliers["Subscription"](Subscription),
    })
  );

export default applyAcl;
