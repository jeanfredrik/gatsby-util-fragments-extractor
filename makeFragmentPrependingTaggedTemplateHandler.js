const taggedTemplateNoop = require("tagged-template-noop");

const extractFragmentName = require("./extractFragmentName");
const getQueryFragmentDeps = require("./getQueryFragmentDeps");

const makeFragmentPrependingTaggedTemplateHandler = ({
  fragments,
  taggedTemplateHandler = taggedTemplateNoop,
}) => {
  return function gql(...args) {
    let query = taggedTemplateNoop(...args);
    let fragmentDeps = getQueryFragmentDeps(fragments, query);
    let prependedFragments = fragments
      // Gatsby’s GraphQL server throws an error for unused fragments, so we try
      // to filter those out here.
      .filter((fragment) => {
        let name = extractFragmentName(fragment);
        return fragmentDeps.has(name);
      })
      .join("\n");
    return taggedTemplateHandler([prependedFragments + "\n" + query]);
  };
};

module.exports = makeFragmentPrependingTaggedTemplateHandler;
