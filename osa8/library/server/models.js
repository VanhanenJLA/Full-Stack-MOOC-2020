
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    favoriteGenre: {
        type: String,
        required: true,
    },
})

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    published: {
        type: Number,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author',
    },
    genres: [
        { type: String }
    ]
})

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    born: {
        type: Number,
    },
    bookCount: {
        type: Number,
        required: true,
        default: 0,
    }
})

module.exports = {
    Author: mongoose.model('Author', authorSchema),
    Book: mongoose.model('Book', bookSchema),
    User: mongoose.model('User', userSchema),
}