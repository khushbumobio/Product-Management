const userRouter = require('./userRoutes')
const authRouter = require('./authRoutes')
const categoryRouter = require('./categoryRoutes')

module.exports = (app) => {
    app.use('/auth', authRouter);
    app.use('/user',userRouter);
    app.use('/category',categoryRouter);
}
