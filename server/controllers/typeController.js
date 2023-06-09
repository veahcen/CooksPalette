const { TypeFood } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) { // создание типа еды
        try {
            const { name_type } = req.body; // передаем название типа
            const type = await TypeFood.create({ name_type });
            return res.json(type);
        } catch (error) {
            // Обработка ошибки и отправка соответствующего HTTP-ответа
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getAll(req, res) {
        try {
            const types = await TypeFood.findAll(); //вернет записи с бдвсе
            return res.json(types);
        } catch (error) {
            // Обработка ошибки и отправка соответствующего HTTP-ответа
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req, res) {
        try {
            const { name_type } = req.body;
            const type = await TypeFood.findOne({ where: { name_type } });

            if (type) {
                await type.destroy();
                return res.json({ message: 'Тип успешно удален' });
            } else {
                return res.status(404).json({ error: 'Тип не найден' });
            }
        } catch (error) {
            // Обработка ошибки и отправка соответствующего HTTP-ответа
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new TypeController();