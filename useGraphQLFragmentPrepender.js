const taggedTemplateNoop = require("tagged-template-noop");

const makeFragmentPrependingTaggedTemplateHandler = require("./makeFragmentPrependingTaggedTemplateHandler");

const useGraphQLFragmentPrepender = ({
  fragments,
  taggedTemplateHandler = taggedTemplateNoop,
}) => {
  let gql = makeFragmentPrependingTaggedTemplateHandler({
    fragments,
    taggedTemplateHandler,
  });
  return { gql, prepend: (query) => gql([query]) };
};

module.exports = useGraphQLFragmentPrepender;
