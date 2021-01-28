const getQuery = require("./getQuery");
const traverse = require("traverse");

module.exports = function getUsedFragments(query) {
  let names = new Set();
  query = getQuery(query);
  traverse(query).forEach(function (x) {
    const { isLeaf, parent } = this;
    if (isLeaf && parent && parent.key === "name") {
      if (parent.parent && parent.parent.node.kind === "FragmentSpread") {
        names.add(parent.node.value);
      }
    }
  });
  return names;
};
