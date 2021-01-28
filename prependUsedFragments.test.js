const gql = require("graphql-tag");
const prependUsedFragments = require("./prependUsedFragments");

const removeLoc = ({ loc, ...ast }) => (loc, ast);

describe("prependUsedFragments", () => {
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
    expect(prependUsedFragments(fragments, query)).toEqual(
      removeLoc(gql`
        fragment MyFirstFragment on MyType {
          field1
        }
        fragment MySecondFragment on MyType {
          field1
        }
        query MyQuery {
          field1 {
            ...MyFirstFragment
          }
          field2
          ...MySecondFragment
        }
      `),
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
    expect(prependUsedFragments(fragments, query)).toEqual(
      removeLoc(gql`
        fragment MyFirstFragment on MyType {
          field1
        }
        fragment MySecondFragment on MyType {
          field1
        }
        query MyQuery {
          field1 {
            ...MyFirstFragment
          }
          field2
          ...MySecondFragment
        }
      `),
    );
  });
});
