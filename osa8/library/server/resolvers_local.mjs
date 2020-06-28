const { uuid } = require('uuidv4')
import {books, authors} from './mock-data'

const authorExists = name =>
  authors.find(a => a.name.toLowerCase() === name.toLowerCase())

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      const { author, genre } = args
      if (!author && !genre)
        return books;
      if (author && genre)
        return books.filter(b => b.author === author && b.genres.includes(genre))
      if (author)
        return books.filter(b => b.author === author)
      if (genre)
        return books.filter(b => b.genres.includes(genre))
    },
    allAuthors: () => authors
      .map(author =>
        ({ ...author, bookCount: books.filter(b => b.author === author.name).length })),
  },
  
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      const author = args.author;

      if (!authorExists(author))
        authors = authors.concat({ ...author, id: uuid() })

      return book;
    },

    editAuthor: (root, args) => {
      const author = authorExists(args.name)
      if (!author)
        return null;

      const editedAuthor = { ...author, born: args.setBornTo }

      authors = authors
        .map(a => a.name.toLowerCase() === args.name.toLowerCase() ? editedAuthor : a);

      console.log(editedAuthor);
      return editedAuthor;
    }
  }

}

module.exports = resolvers;