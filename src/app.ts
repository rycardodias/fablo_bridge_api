import express, { Request, Response } from "express";

const app = express();

app.use(express.json());


app.use('/test', require('./routes/test'))

app.all('*', (req: Request, res: Response) => {
    return res.send('Invalid request!')
});

app.listen(3000, () => {
    console.log(`App listening on port ${3000}`)
})

