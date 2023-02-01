const authRouter = require('./authRoutes')

module.exports = (app) => {
    app.use('/auth', authRouter)
}
