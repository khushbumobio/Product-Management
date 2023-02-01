const authRouter = require('./authRoutes')
const userRouter =require('./userRoutes')

module.exports = (app) => {
    app.use('/auth', authRouter);
    app.use('/user',userRouter)
}
