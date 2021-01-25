const extractFragmentName = require("./extractFragmentName");
const flattenDeps = require("./flattenDeps");

/**
 * Checks what fragments are used in a query and returns the names of those recursively
 * @param {string[]} fragments GraphQL strings containing fragment definitions
 * @param {string} query GraphQL query that might use fragments
 * @returns {Set<string>} Fragments names
 */
const getQueryFragmentDeps = (fragments, query) => {
  let fragmentDeps = {};
  fragments.forEach((fragment) => {
    let fragmentName = extractFragmentName(fragment);
    let deps = new Set();
    fragment.replace(/^\s*\.\.\.\s*(\w+)\s*$/gm, (match, fragmentName) => {
      deps.add(fragmentName);
    });
    fragmentDeps[fragmentName] = [...deps];
  });
  let queryDeps = new Set();
  query.replace(/^\s*\.\.\.\s*(\w+)\s*$/gm, (match, fragmentName) => {
    queryDeps.add(fragmentName);
  });
  queryDeps = [...queryDeps];
  return flattenDeps(fragmentDeps, queryDeps);
};

module.exports = getQueryFragmentDeps;
