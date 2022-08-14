import express, { Request, Response } from "express";
const ErrorHandler = require("./classes/ErrorHandler")
const db = require('./config/postgresDatabase')
const i18next = require('i18next');
const middleware = require('i18next-http-middleware')

// db.authenticate()
//     .then(() => {
//         console.info('Connection has been established successfully.')
//         db.sync({ alter: true })
//             .then(() => console.log("All models were synchronized successfully."))
//             .catch((error: any) => console.error('Unable to connect to the database:', error))

//     })
//     .catch((error: any) => console.error('Unable to connect to the database:', error))

i18next
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        resources: {
            en: {
                translation: require('./locales/en/translation.json')
            },
            pt: {
                translation: require('./locales/pt/translation.json')
            }
        }
    })

const app = express();
app.use(express.json());

app.use(middleware.handle(i18next))

app.use('/users', require('./routes/user'))

app.all('*', (req: Request, res: Response) => {
    return res.send('Invalid request!')
});

app.use(ErrorHandler)

app.listen(3000, () => {
    // console.info(`App listening on port ${3000}`)
})



