const express = require('express') // Servidor web.
const { nanoid } = require('nanoid') // Para gerar códigos curtos aleatórios.

const app = express() // <----- ESTA LINHA CRIA O app
const PORT = 3000

// Banco de dados na memoria.
const urlDatabase = {}

app.use(express.json())

// Criando rota para encurtar URL.
app.post('/shorten', (req, res) => {

    const { url } = req.body

    if (!url) return res.status(400).json({ error: 'URL é Obrigatoria' })

    const shortId = nanoid(6)

    urlDatabase[shortId] = url

    const shortUrl = `http://localhost:${PORT}/${shortId}`

    res.json({ shortUrl })

})


app.get('/:shortId', (req, res) => {

    const { shortId } = req.params
    const originalUrl = urlDatabase[shortId]

    if (originalUrl) {
        res.redirect(originalUrl)
    } else {
        res.status(404).send('URL não encontrado.')
    }

})


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})