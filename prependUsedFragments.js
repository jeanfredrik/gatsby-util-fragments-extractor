const extractFragmentName = require("./extractFragmentName");
const getQuery = require("./getQuery");
const getQueryFragmentDeps = require("./getQueryFragmentDeps");
const mergeGraphQLDocuments = require("./mergeGraphQLDocuments");

/**
 * Returns the name of the defined fragment in the GrapgQL string
 * @param {string|object} fragment A GrapgQL string or AST containing a fragment definition
 * @returns {string} The name of the fragment
 */
module.exports = function prependUsedFragments(fragments, query) {
  fragments = fragments.map((fragment) => getQuery(fragment));
  query = getQuery(query);
  if (query.kind !== "Document") {
    return null;
  }
  let fragmentNames = getQueryFragmentDeps(fragments, query);
  let prependedFragments = fragments.filter((fragment) =>
    fragmentNames.has(extractFragmentName(fragment)),
  );
  return mergeGraphQLDocuments([...prependedFragments, query]);
};
