import { graphql } from "gatsby";

export const query = graphql`
  fragment MySecondFragment on MyType {
    field1
    field2
  }
`;

export const query2 = graphql`
  fragment MyThirdFragment on MyType {
    field1
    field2
  }
`;
