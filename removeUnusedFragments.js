const extractFragmentName = require("./extractFragmentName");
const flattenDeps = require("./flattenDeps");
const getUsedFragments = require("./getUsedFragments");

/**
 * Checks what fragments are used in a query and returns the names of those recursively
 * @param {string[]} fragments GraphQL strings containing fragment definitions
 * @param {string} query GraphQL query that might use fragments
 * @returns {Set<string>} Fragments names
 */
module.exports = function removeUnusedFragments(queryWithFragments) {
  let fragmentDeps = {};
  fragments.forEach((fragment) => {
    let fragmentName = extractFragmentName(fragment);
    fragmentDeps[fragmentName] = getUsedFragments(fragment);
  });
  let queryDeps = getUsedFragments(query);
  return flattenDeps(fragmentDeps, queryDeps);
};
