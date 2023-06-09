const {Sequelize} = require('sequelize') // импорт модуля

// module.exports = new Sequelize( // объект кл, передаем пользв пароль и т д
//     process.env.DB_NAME,
//     process.env.DB_NAME,
//     process.env.DB_PASSWORD,
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT
//     }
// )

const sequelize = new Sequelize('kp0091_14t2', 'st0091', 'qwerty91', {
    host: '172.20.8.18',
    port: 5432,
    dialect: 'postgres',
});

module.exports = sequelize;