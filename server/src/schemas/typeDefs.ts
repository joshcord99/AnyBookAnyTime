const typeDefs = `
type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}


type User {
    username: String
    email: String
    password: String
    savedBooks: [Book]
}

type Auth{
token: ID!
user: User
}


type Query{
    getSingleUser(id: ID, username: String): User
}

type Mutation{
    createUser(username: String, email: String, password: String): Auth
    saveBook(description: String, bookId: String, title: String) : User
    deleteBook(bookId: String): User
    login(email: String, password: String): Auth
}

`;
export default typeDefs;
