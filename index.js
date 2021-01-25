const taggedTemplateNoop = require("tagged-template-noop");

const makeFragmentPrependingTaggedTemplateHandler = require("./makeFragmentPrependingTaggedTemplateHandler");
const collectGraphQLFragments = require("./collectGraphQLFragments");

module.exports = async (params = {}) => {
  let {
    fragmentsDir = {},
    taggedTemplateHandler = taggedTemplateNoop,
  } = params;
  const fragments = await collectGraphQLFragments(fragmentsDir);
  const gql = makeFragmentPrependingTaggedTemplateHandler({
    fragments,
    taggedTemplateHandler,
  });
  return { gql };
};
