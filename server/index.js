require('dotenv').config() // для считывания файла с пер окр
const express = require('express') // импорт express
const sequelize = require('./db.js') // const для сохранения импортированных модулей
const modules = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHendingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000 // получаем порт из переменных окружения

const app = express() //запуск приложения
app.use(cors())
app.use(express.json()) // парсить этот фармат
app.use(express.static(path.resolve(__dirname, 'static'))) // для получения статики
app.use(fileUpload({}))
app.use('/api', router) // url обработки и роутер
// Обработка ошибок в конце, последний мидлвеир, next не нужет
app.use(errorHandler)

const start = async () => { // все операции с бд асинхронны
    try {
        await sequelize.authenticate() // подкл к бд
        await sequelize.sync() //сверяет сост бд со схемами бд
        app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

start()

/*const server = app.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`)
})
module.exports = server*/
