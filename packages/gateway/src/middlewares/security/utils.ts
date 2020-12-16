import { get, includes } from "lodash";
import gql from "graphql-tag";
import { errorMessages } from "../../utils/error.msg";

export const excludeMiddleware = (
  excluded: any,
  middleware: any,
  types: any = []
) => (req: any, res: any, next: any) => {
  if (req.method === "GET") return next();
  const graphqlRequest = gql(req.body.query);
  const operationType = get(graphqlRequest, "definitions[0].operation");

  if (includes(types, operationType.toLowerCase())) return next();

  const operationName = get(
    graphqlRequest,
    "definitions[0].selectionSet.selections[0].name.value"
  );

  if (!operationName) {
    return res.json({
      errors: [
        {
          message: errorMessages["app/failed-operation"],
        },
      ],
    });
  }

  if (includes(excluded, operationName)) return next();
  return middleware(req, res, next);
};
