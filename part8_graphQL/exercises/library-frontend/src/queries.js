import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        author {
            name
        }
        title
        published
        id
        genres
    }
`;

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
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
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
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
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

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
`;
