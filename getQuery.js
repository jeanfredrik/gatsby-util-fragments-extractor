const gql = require("graphql-tag").default;

module.exports = function getQuery(query) {
  if (typeof query === "object" && query.definitions) {
    return query;
  } else if (typeof query === "string") {
    return gql(query);
  } else if (typeof query === "object" && query.source) {
    return gql(query.source);
  } else {
    throw new Error("Could not parse query: " + query);
  }
};
