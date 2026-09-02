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

export const ALL_BOOKS = gql`
    query allBooks {
        allBooks {
            author
            title
            published
            id
        }
    }
`;

export const ADD_BOOK = gql`
    mutation addBook(
        $title: String!
        $published: Int!
        $author: String!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            author
            title
            published
            id
            genres
        }
    }
`;

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            bookCount
            born
            id
            name
        }
    }
`;
