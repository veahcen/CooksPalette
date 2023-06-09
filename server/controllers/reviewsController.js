const { Reviews, Food } = require("../models/models");

class ReviewsController {
    async createReview(req, res) {
        try {
            const { description, foodId } = req.body;
            const userId = req.user.id;

            const review = await Reviews.create({
                description,
                foodId,
                userId,
            });

            return res.json(review);
        } catch (error) {
            console.log("Ошибка при создании комментария:", error);
            return res.status(500).json({ message: "Ошибка при создании комментария" });
        }
    }

    async deleteReview(req, res) {
        try {
            const { id } = req.params;

            await Reviews.destroy({
                where: {
                    id,
                },
            });

            return res.json({ message: "Комментарий успешно удален" });
        } catch (error) {
            console.log("Ошибка при удалении комментария:", error);
            return res.status(500).json({ message: "Ошибка при удалении комментария" });
        }
    }

    async getReviewsByFood(req, res) {
        try {
            const { id } = req.params;

            const reviews = await Reviews.findAll({
                where: {
                    foodId: id,
                },
                include: [
                    {
                        model: Food,
                    },
                ],
            });

            return res.json(reviews);
        } catch (error) {
            console.log("Ошибка при получении комментариев к еде:", error);
            return res.status(500).json({ message: "Ошибка при получении комментариев к еде" });
        }
    }
}

module.exports = new ReviewsController();
