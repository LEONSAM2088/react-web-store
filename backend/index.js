require('dotenv').config()
const sequelize = require('./db')
const PORT = process.env.REACT_APP_PORT || 5000
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const app = express();
const router = require('./routes')
const errHandler = require('./middleware/ErrHandlingMiddleware')


app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(fileUpload({}))

app.use(errHandler)
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Its alright! ${PORT}`))
    } catch (e) {
        console.log("err")
    }

}

start()
