const mongoose = require("mongoose")

// Mongoose book schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String
    },
    year: {
        type: Number
    },
    codeISBN: {
        type: String,
        maxlength: 13,
        unique: true
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    lastPublished: {
        type: Date,
        default: Date.now
    },
    genre: {
        type: String,
        enum: ["romance", "fiction", "biography", "poetry"]
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'Author'                   // Nombre del modelo relacionado
    }
}, {
    timestamps: true
})

// Mongoose book model
const Book = mongoose.model('Book', bookSchema)

module.exports = Book