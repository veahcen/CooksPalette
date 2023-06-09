const uuid = require('uuid')
const path = require('path');
const {Food, FoodInfo, User} = require("../models/models")
const ApiError = require('../error/ApiError')

class FoodController {
    async create(req, res, next) {
        try{
            let {name, typeFoodId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) // путь
            const food = await Food.create({name, typeFoodId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    FoodInfo.create({
                        description: i.description,
                        ingredients: i.ingredients,
                        foodId: food.id
                    })
                )
            }

            return res.json(food)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        let {typeFoodId, limit, page} = req.query // из строки запроса + постр вывод
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit // посчитаем сколько эл пропустить
        let foods;
        if (!typeFoodId) {
            foods = await Food.findAndCountAll({ // общее кол-во
                limit: limit,
                offset: offset,
            });
        }
        if (typeFoodId) {
            foods = await Food.findAndCountAll({
                where: {
                    typeFoodId: parseInt(typeFoodId),
                },
                limit: limit,
                offset: offset,
            }); //поиск по полю
        }


        return res.json(foods)
    }
    async getOne(req, res) {
        const {id} = req.params
        const food = await Food.findOne({
            where: {id},
            include: [{model: FoodInfo, as: 'info'}]
        })
        return res.json(food)
    }
    async deleteOne(req, res, next) {
        try {
            const {id} = req.params;
            await Food.destroy({
                where: {id}
            });
            return res.json({message: "Food deleted successfully"});
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async updateRating(req, res, next) {
        try {
            const { id } = req.params;
            const { rating } = req.body;

            // Находим блюдо по его идентификатору
            const food = await Food.findByPk(id);
            if (!food) {
                next(ApiError.badRequest("Food not found"));
            }

            // Получаем текущий рейтинг и количество оценок из базы данных
            let currentRating = food.rating || 0;
            let ratingCount = food.ratingCount || 0;

            // Вычисляем новый средний рейтинг
            const newRating = (currentRating * ratingCount + rating) / (ratingCount + 1);

            // Обновляем рейтинг и количество оценок блюда в базе данных
            await Food.update(
                {
                    rating: newRating,
                    ratingCount: ratingCount + 1
                },
                {
                    where: { id }
                }
            );

            // Получаем обновленную информацию о блюде из базы данных
            const updatedFood = await Food.findByPk(id);

            return res.json(updatedFood);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new FoodController()