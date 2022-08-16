import app from './app';

app.listen(process.env.PORT || 3000, () => {
    console.info(`App listening on port http://localhost:${3000}`)
})