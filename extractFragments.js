const getQuery = require("./getQuery");

/**
 * Returns the name of the defined fragment in the GrapgQL string
 * @param {string|object} fragment A GrapgQL string or AST containing a fragment definition
 * @returns {string} The name of the fragment
 */
const extractFragments = (queryWithFragments) => {
  queryWithFragments = getQuery(queryWithFragments);
  if (queryWithFragments.kind !== "Document") {
    return null;
  }
  let fragments = queryWithFragments.definitions
    .filter((definition) => definition.kind === "FragmentDefinition")
    .map((definition) => ({
      kind: "Document",
      definitions: [definition],
    }));
  return fragments;
};

module.exports = extractFragments;
