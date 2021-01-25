/**
 * Returns the name of the defined fragment in the GrapgQL string
 * @param {string} fragment A GrapgQL string containing a fragment definition
 * @returns {string} The name of the fragment
 */
const extractFragmentName = (fragment) => {
  let [, name] = fragment.match(/^\s*fragment\s+(\w+)\s+on\s/m) || [];
  return name;
};

module.exports = extractFragmentName;
