# Product-Management

clone directory in your local machine

npm install 
node src/index.js

add below content in  .env file in product-management

PORT = 3000
API_URL = 'http://localhost:3000'
DB_USERNAME = 'add db user name'
DB_PASSWORD = 'add db password'
DB_HOST = cluster0.fvzypzl.mongodb.net
DB_NAME = 'product-management'

config folder contains db.js file which will help to connect database
src folder contains controllers,models,middleware,routes,utills,config folders and app and index file

src/controllers contains all controller like: authController,userController,categoryController,productController
src/models contains all models like: user model,category model,product model
routes contains all routes filles for product management
utills contains mails for sendMail and generate password
      send mail use when customer created
      generate password use when customer want to generate password by admin
config folder a file where all the message defines

