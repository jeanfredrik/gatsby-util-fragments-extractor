const path = require("path");

const GatsbyParser = require("gatsby/dist/query/file-parser").default;
const glob = require("glob");

/**
 * Collect all graphql fragments from a directory
 * @see https://github.com/gatsbyjs/gatsby/issues/12155#issuecomment-618424527
 */
const collectGraphQLFragments = async (dirname) => {
  const parser = new GatsbyParser();
  const files = glob.sync(path.resolve(dirname, "**/*.js"));
  const result = await parser.parseFiles(files);

  return result
    .filter((item) => item.doc && item.doc.kind === "Document")
    .flatMap((file) => {
      const fragments =
        file.doc.definitions.filter(
          (def) => def.kind === "FragmentDefinition",
        ) || [];

      return fragments.map(({ loc: { start, end, source: { body } } }) =>
        body.slice(start, end),
      );
    });
};

module.exports = collectGraphQLFragments;
