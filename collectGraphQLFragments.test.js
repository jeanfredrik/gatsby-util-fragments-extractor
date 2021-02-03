const collectGraphQLFragments = require("./collectGraphQLFragments");

describe("collectGraphQLFragments", () => {
  it("parses files in dir and returns fragments", async () => {
    const dir = __dirname + "/test-data/fragments";
    let fragments = await collectGraphQLFragments(dir);
    expect(fragments).toEqual([
      `fragment MyFirstFragment on MyType {
    field1
    field2
  }`,
      `fragment MySecondFragment on MyType {
    field1
    field2
  }`,
      `fragment MyThirdFragment on MyType {
    field1
    field2
  }`,
    ]);
  });
});
