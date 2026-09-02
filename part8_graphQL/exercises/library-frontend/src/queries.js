import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
    query allAuthors {
        allAuthors {
            bookCount
            born
            id
            name
        }
    }
`;
