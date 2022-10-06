import express, { Application, Request, Response } from 'express'
const ErrorHandler = require("./validators/ErrorHandler")
const db = require('./config/postgresDatabase')
const i18next = require('i18next');
const middleware = require('i18next-http-middleware')
const session = require('express-session')
const SequelizeStore = require("connect-session-sequelize")(session.Store);
var cors = require('cors')

db.authenticate()
    .then(() => {
        // console.clear()
        console.info('Connection has been established successfully.')
        db.sync({ alter: true })
            .then(() => console.log("All models were synchronized successfully."))
            .catch((error: any) => console.error('Unable to connect to the database:', error))

    })
    .catch((error: any) => console.error('Unable to connect to the database:', error))

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
// app.set('trust proxy', 1)
app.use(cors(
    {
        origin: process.env.WEB_APP_URL || "http://localhost:3000",
        credentials: true,            //access-control-allow-credentials:true
        optionSuccessStatus: 200,
    }
))

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
        maxAge: 60 * 60 * 24 * 1000,
    }
}))

sessionStore.sync()

app.all('/', (req: Request, res: Response) => {
    return res.send("FABLO BRIDGE API!")
});

app.use('/users', require('./routes/user'))
app.use('/companies', require('./routes/company'))
app.use('/companyCertifications', require('./routes/companyCertification'))
app.use('/companyCertificationTypes', require('./routes/companyCertificationType'))
app.use('/certifyingEntities', require('./routes/certifyingEntity'))
app.use('/productionUnits', require('./routes/productionUnit'))
app.use('/socialEconomicDatas', require('./routes/socialEconomicData'))
app.use('/batchCertificationTypes', require('./routes/batchCertificationType'))
app.use('/batchCertifications', require('./routes/batchCertification'))
app.use('/finalIndicators', require('./routes/finalIndicator'))
app.use('/circularEnvironmentalFinalDatas', require('./routes/circularEnvironmentalFinalData'))
app.use('/indicators', require('./routes/indicator'))
app.use('/activityTypeIndicators', require('./routes/activityTypeIndicator'))
app.use('/data', require('./routes/data'))
app.use('/activityTypeData', require('./routes/activityTypeData'))
app.use('/productionActivityData', require('./routes/productionActivityData'))
app.use('/rawMaterials', require('./routes/rawMaterial'))
app.use('/circularEnvironmentalData', require('./routes/circularEnvironmentalData'))



app.all('*', (req: Request, res: Response) => {
    return res.json({ error: 'Invalid request!' })
});

app.use(ErrorHandler)

export default app;


