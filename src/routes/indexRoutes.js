const userRouter = require('./userRoutes')
const authRouter = require('./authRoutes')

module.exports = (app) => {
    app.use('/auth', authRouter);
    app.use('/user',userRouter)
}
