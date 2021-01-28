const getQuery = require("./getQuery");

module.exports = function mergeGraphQLDocuments(documents) {
  let definitions = [];
  documents.forEach((document) => {
    definitions.push(...getQuery(document).definitions);
  });
  return {
    kind: "Document",
    definitions,
  };
};
