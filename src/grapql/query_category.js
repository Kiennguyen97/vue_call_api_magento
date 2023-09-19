import gql from 'graphql-tag';

export const GET_ALL_CATEGORIES = gql`
  query {
    categories(filters: {}, pageSize: 20, currentPage: 1) {
      items {
        id
        name 
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories($url_key: [String]) {
    categories(filters: { url_key: { in: $url_key } }) {
      items {
        id
        name
        
      }
    }
  }
`;