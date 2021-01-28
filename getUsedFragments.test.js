const getUsedFragments = require("./getUsedFragments");
const gql = require("graphql-tag");

describe("getUsedFragments", () => {
  it("handles string", () => {
    let query = `
      query MyQuery {
        field1 {
          ...MyFirstFragment
        }
        field2
        ...MySecondFragment
      }
    `;
    expect(getUsedFragments(query)).toEqual(
      new Set(["MyFirstFragment", "MySecondFragment"]),
    );
  });
  it("handles AST", () => {
    let query = gql`
      query MyQuery {
        field1 {
          ...MyFirstFragment
        }
        field2
        ...MySecondFragment
      }
    `;
    expect(getUsedFragments(query)).toEqual(
      new Set(["MyFirstFragment", "MySecondFragment"]),
    );
  });
  it("handles multiple uses of same fragment", () => {
    let query = gql`
      query MyQuery {
        field1 {
          ...MyFirstFragment
        }
        field2 {
          ...MyFirstFragment
        }
        ...MySecondFragment
      }
    `;
    expect(getUsedFragments(query)).toEqual(
      new Set(["MyFirstFragment", "MySecondFragment"]),
    );
  });
});
