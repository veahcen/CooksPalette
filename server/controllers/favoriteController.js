const {Food, FavoritesFood, Favorites} = require('../models/models')

class FavoriteController {

    async addToFavorite (req, res, next) {
        const user = req.user
        const {foodId} = req.body
        const food = await FavoritesFood.create({favoriteId : user.id, foodId : foodId})
        return res.json(food)
    }

    async getFavoriteUser(req,res){
        const {id} = req.user
        const food = await FavoritesFood.findAll({include: {
                model: Food
            }, where: {favoriteId: id}})

        return res.json(food)
    }

    async removeFromFavorite(req, res, next) {
        const user = req.user;
        const { foodId } = req.query;

        await FavoritesFood.destroy({
            where: { favoriteId: user.id, foodId: foodId }
        });

        res.sendStatus(200);
    }

    async isFoodInFavorites(req, res) {
        const user = req.user;
        const { foodId } = req.params;

        const favorite = await FavoritesFood.findOne({
            where: { favoriteId: user.id, foodId: foodId },
        });

        if (favorite) {
            return res.json({ isFavorite: true });
        } else {
            return res.json({ isFavorite: false });
        }
    }

}

module.exports = new FavoriteController()