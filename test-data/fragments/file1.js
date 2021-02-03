import { graphql } from "gatsby";

export const query = graphql`
  fragment MyFirstFragment on MyType {
    field1
    field2
  }
`;
