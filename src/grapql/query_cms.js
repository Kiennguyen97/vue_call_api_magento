import gql from 'graphql-tag';

const GET_CMS_PAGE = gql`
  query GetCmsPage($identifier: String!) {
    cmsPage(identifier: $identifier) {
      content
    }
  }
`;

const GET_CMS_BLOCKS = gql`
  query GetCmsBlocks($identifiers: [String!]) {
    cmsBlocks(identifiers: $identifiers) {
      items {
        content
      }
    },
  }
`;

export { GET_CMS_PAGE, GET_CMS_BLOCKS }