const extractFragments = require("./extractFragments");
const extractFragmentName = require("./extractFragmentName");
const gql = require("graphql-tag");

describe("extractFragments", () => {
  it("handles string", () => {
    let queryWithFragments = `
      fragment MyFirstFragment on MyType {
        field1
      }
      fragment MySecondFragment on MyType {
        field1
      }
      fragment MyUnusedFragment on MyType {
        field1
      }
      query MyQuery {
        field1 {
          ...MyFirstFragment
        }
        field2
        ...MySecondFragment
      }
    `;
    expect(
      extractFragments(queryWithFragments).map((fragment) =>
        extractFragmentName(fragment),
      ),
    ).toEqual(["MyFirstFragment", "MySecondFragment", "MyUnusedFragment"]);
  });
  it("handles AST", () => {
    let queryWithFragments = gql`
      fragment MyFirstFragment on MyType {
        field1
      }
      fragment MySecondFragment on MyType {
        field1
      }
      fragment MyUnusedFragment on MyType {
        field1
      }
      query MyQuery {
        field1 {
          ...MyFirstFragment
        }
        field2
        ...MySecondFragment
      }
    `;
    expect(
      extractFragments(queryWithFragments).map((fragment) =>
        extractFragmentName(fragment),
      ),
    ).toEqual(["MyFirstFragment", "MySecondFragment", "MyUnusedFragment"]);
  });
});
