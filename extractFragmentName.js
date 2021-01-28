const getQuery = require("./getQuery");

/**
 * Returns the name of the defined fragment in the GrapgQL string
 * @param {string|object} fragment A GrapgQL string or AST containing a fragment definition
 * @returns {string} The name of the fragment
 */
const extractFragmentName = (fragment) => {
  fragment = getQuery(fragment);
  if (fragment.kind !== "Document") {
    return null;
  }
  if (fragment.definitions[0].kind !== "FragmentDefinition") {
    return null;
  }
  return fragment.definitions[0].name.value;
};

module.exports = extractFragmentName;
