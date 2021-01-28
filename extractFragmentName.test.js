const extractFragmentName = require("./extractFragmentName");
const gql = require("graphql-tag");

describe("extractFragmentName", () => {
  it("handles string", () => {
    let fragment = `
      fragment MyFragment on MyType {
        field1
        field2
      }
    `;
    expect(extractFragmentName(fragment)).toEqual("MyFragment");
  });
  it("handles AST", () => {
    let fragment = gql`
      fragment MyFragment on MyType {
        field1
        field2
      }
    `;
    expect(extractFragmentName(fragment)).toEqual("MyFragment");
  });
});
