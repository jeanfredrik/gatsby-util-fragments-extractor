const omit = require("lodash/omit");

/**
 * Given a tree of dependencies returns a flat array of all nested dependencies
 * @param {Object} allDeps Dependency tree where values are arrays of dependencies
 * @param {string[]} rootDeps Top level dependencies
 * @param {number} [depth=0] Used internally to avoid infinite recursion
 * @returns {Set<string>} All nested dependencies
 */
const flattenDeps = (allDeps, rootDeps, depth = 0) => {
  if (rootDeps.length === 0) {
    return new Set();
  }
  if (depth > 10) {
    return [];
  }
  let deps = new Set();
  rootDeps.forEach((dep) => {
    if (!allDeps[dep]) {
      return;
    }
    allDeps[dep].forEach((dep) => {
      deps.add(dep);
    });
  });
  return new Set([
    ...rootDeps,
    ...deps,
    ...flattenDeps(omit(allDeps, [...rootDeps]), [...deps], depth + 1),
  ]);
};

module.exports = flattenDeps;
