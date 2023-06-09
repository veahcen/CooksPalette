const sequelize = require('../db.js')
const  {DataTypes} = require('sequelize') //описание полей

const User = sequelize.define(`user`, {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unicode: true}, // не может повторятся
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Food = sequelize.define(`food`, {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unicode: true},
    img: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    ratingCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    approved: {type: DataTypes.BOOLEAN, defaultValue: false},
})

const TypeFood = sequelize.define(`type_food`, {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_type: {type: DataTypes.STRING, unicode: true},
})

const FoodInfo = sequelize.define(`food_info`, {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull: false},
    ingredients: {type: DataTypes.STRING, allowNull: false},
})

const Reviews = sequelize.define(`reviews`, { // отзывы
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Favorites = sequelize.define(`favorites`, {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const FavoritesFood = sequelize.define(`favorites_food`, {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasMany(Food)
Food.belongsTo(User)

User.hasOne(Favorites)
Favorites.belongsTo(User)

Favorites.hasMany(FavoritesFood)
FavoritesFood.belongsTo(Favorites)

User.hasMany(Reviews)
Reviews.belongsTo(User)

Food.hasMany(Reviews)
Reviews.belongsTo(Food)

Food.hasMany(FavoritesFood)
FavoritesFood.belongsTo(Food)

Food.hasMany(FoodInfo, {as: 'info'})
FoodInfo.belongsTo(Food)

TypeFood.hasMany(Food)
Food.belongsTo(TypeFood)

module.exports = { // для использов в других файлах
    User,
    Food,
    TypeFood,
    FoodInfo,
    Reviews,
    Favorites,
    FavoritesFood
}