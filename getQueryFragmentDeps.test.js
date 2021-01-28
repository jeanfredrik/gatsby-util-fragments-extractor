const getQueryFragmentDeps = require("./getQueryFragmentDeps");
const gql = require("graphql-tag");

describe("getQueryFragmentDeps", () => {
  it("handles string", () => {
    let fragments = [
      `fragment MyFirstFragment on MyType {
        field1
      }`,

      `fragment MySecondFragment on MyType {
        field1
      }`,

      `fragment MyUnusedFragment on MyType {
        field1
      }`,
    ];
    let query = `
      query MyQuery {
        field1 {
          ...MyFirstFragment
        }
        field2
        ...MySecondFragment
      }
    `;
    expect(getQueryFragmentDeps(fragments, query)).toEqual(
      new Set(["MyFirstFragment", "MySecondFragment"]),
    );
  });
  it("handles AST", () => {
    let fragments = [
      gql`
        fragment MyFirstFragment on MyType {
          field1
        }
      `,
      gql`
        fragment MySecondFragment on MyType {
          field1
        }
      `,
      gql`
        fragment MyUnusedFragment on MyType {
          field1
        }
      `,
    ];
    let query = gql`
      query MyQuery {
        field1 {
          ...MyFirstFragment
        }
        field2
        ...MySecondFragment
      }
    `;
    expect(getQueryFragmentDeps(fragments, query)).toEqual(
      new Set(["MyFirstFragment", "MySecondFragment"]),
    );
  });
});
