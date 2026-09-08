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
    query allBooks($genre: String) {
        allBooks(genre: $genre) {
            author {
                name
            }
            title
            published
            id
            genres
        }
    }
`;

export const ALL_GENRES = gql`
    query {
        allGenres
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
            author {
                name
            }
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

export const LOGIN = gql`
    mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;

export const ME = gql`
    query me {
        me {
            username
            id
            favoriteGenre
        }
    }
`;
