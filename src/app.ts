import express, { Application, Request, Response } from 'express'
const ErrorHandler = require("./validators/ErrorHandler")
const db = require('./config/postgresDatabase')
const i18next = require('i18next');
const middleware = require('i18next-http-middleware')
const session = require('express-session')
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cors = require('cors')

db.authenticate()
    .then(() => {
        // console.clear()
        console.info('Connection has been established successfully.')
        // db.sync({ alter: true })
        //     .then(() => console.log("All models were synchronized successfully."))
        //     .catch((error: any) => console.error('Unable to connect to the database:', error))

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

app.use('/activityTypeData', require('./routes/offChain/activityTypeData'))
app.use('/activityTypeIndicators', require('./routes/offChain/activityTypeIndicator'))
app.use('/batchCertifications', require('./routes/offChain/batchCertification'))
app.use('/batchCertificationTypes', require('./routes/offChain/batchCertificationType'))
app.use('/certifyingEntities', require('./routes/offChain/certifyingEntity'))
app.use('/circularEnvironmentalData', require('./routes/offChain/circularEnvironmentalData'))
app.use('/circularEnvironmentalFinalDatas', require('./routes/offChain/circularEnvironmentalFinalData'))
app.use('/companies', require('./routes/offChain/company'))
app.use('/companyCertifications', require('./routes/offChain/companyCertification'))
app.use('/companyCertificationTypes', require('./routes/offChain/companyCertificationType'))
app.use('/data', require('./routes/offChain/data'))
app.use('/finalIndicators', require('./routes/offChain/finalIndicator'))
app.use('/indicators', require('./routes/offChain/indicator'))
app.use('/productionActivityData', require('./routes/offChain/productionActivityData'))
app.use('/productionUnits', require('./routes/offChain/productionUnit'))
app.use('/rawMaterials', require('./routes/offChain/rawMaterial'))
app.use('/socialEconomicData', require('./routes/offChain/socialEconomicData'))
app.use('/users', require('./routes/offChain/user'))

app.use('/onchain/channel/activities/logistical/reception', require('./routes/onChain/channel/activities/logistical/reception'))
app.use('/onchain/channel/activities/logistical/registration', require('./routes/onChain/channel/activities/logistical/registration'))
app.use('/onchain/channel/activities/logistical/transportation', require('./routes/onChain/channel/activities/logistical/transportation'))
app.use('/onchain/channel/activities/production', require('./routes/onChain/channel/activities/production'))
app.use('/onchain/channel/batch', require('./routes/onChain/channel/batch'))
app.use('/onchain/users', require('./routes/onChain/user'))

app.all('*', (req: Request, res: Response) => {
    return res.json({ error: 'Invalid request!' })
});

app.use(ErrorHandler)

module.exports = app;


