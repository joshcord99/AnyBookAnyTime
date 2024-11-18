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


type Query{
    getSingleUser(id: ID, username: String): User
}

type Mutation{
    createUser(username: String, email: String, password: String): User
    saveBook(description: String, bookId: String, title: String) : User
    login(username: String, email: String): User
}

`;
export default typeDefs;
