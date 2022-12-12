const app = require('./app');

const PORT = process.env.SERVER_PORT

app.listen(PORT, () => {
    console.info(`App listening on port http://localhost:${PORT}`)
})