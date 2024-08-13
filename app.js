const express = require("express")
const logger = require("morgan")

const PORT = 5005

const app = express()

// Database connection
require('./db')


app.use(logger("dev"))
app.use(express.static("public"))
app.use(express.json())


// Models
const Book = require('./models/Book.model')
const Author = require("./models/Author.model")

app.get('/api/books', (req, res) => {

    Book
        .find()
        .then(books => res.json(books))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})

app.get('/api/books/:bookId', (req, res) => {

    const { bookId } = req.params

    Book
        .findById(bookId)
        .populate('author')             // nombre del campo a popular
        .then(book => res.json(book))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})

app.post('/api/books', (req, res) => {

    const { title, year, author, genre, codeISBN, quantity } = req.body

    Book
        .create({ title, year, author, genre, codeISBN, quantity })
        .then(book => res.sendStatus(201))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})

app.put('/api/books/:bookId', (req, res) => {

    const { bookId } = req.params
    const { title, year, author, genre, codeISBN, quantity } = req.body

    Book
        .findByIdAndUpdate(bookId, { title, year, author, genre, codeISBN, quantity })
        .then(book => res.sendStatus(200))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})

app.delete('/api/books/:bookId', (req, res) => {

    const { bookId } = req.params

    Book
        .findByIdAndDelete(bookId)
        .then(book => res.sendStatus(200))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})




app.post('/api/authors', (req, res) => {

    const { firstName, lastName, bio } = req.body

    Author
        .create({ firstName, lastName, bio })
        .then(author => res.sendStatus(201))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})


app.listen(PORT, () => console.log(`App listening on port ${PORT}`))