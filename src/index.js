const app = require('./app');
const db= require('../config/db')
// const users = require('./models/users');
// const user=require('./migration/user')

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})