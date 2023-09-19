import gql from "graphql-tag";

export const GET_BLOCK = gql`
  query GetBLock($sku: String!) {
    cmsBlocks(identifiers: [$sku]) {
      items {
        content
        identifier
        title
      }
    }
  }
`;
