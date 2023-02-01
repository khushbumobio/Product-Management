const authRouter = require('./authRoutes')
const userRouter =require('./userRoutes')
const categoryRouter = require('./categoryRoutes')
const productRouter = require('./productRoutes')


module.exports = (app) => {
    app.use('/auth', authRouter);
    app.use('/user',userRouter);
    app.use('/category',categoryRouter);
    app.use('/product',productRouter);

}
