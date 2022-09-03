import express, { Application, Request, Response } from 'express'
const ErrorHandler = require("./validators/ErrorHandler")
const db = require('./config/postgresDatabase')
const i18next = require('i18next');
const middleware = require('i18next-http-middleware')
const session = require('express-session')
const SequelizeStore = require("connect-session-sequelize")(session.Store);

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

const app: Application = express();

app.use(express.json());

app.use(middleware.handle(i18next))

const sessionStore = new SequelizeStore({
    db: db,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 7 * 24 * 60 * 60 * 1000
})

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 60 * 60 * 24 * 1000
    }
}))

sessionStore.sync()

app.all('/', (req: Request, res: Response) => {
    return res.send("FABLO BRIDGE API!")
});

app.use('/users', require('./routes/user'))
app.use('/companies', require('./routes/company'))


app.all('*', (req: Request, res: Response) => {
    return res.json({ error: 'Invalid request!' })
});

app.use(ErrorHandler)

export default app;


