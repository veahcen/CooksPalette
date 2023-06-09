const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./index'); // Подключение вашего приложения Express
const { TypeFood } = require('./models/models');
const jwt = require('jsonwebtoken')

// Подключение Chai в Mocha
chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/type', () => {
    it('should return all food types', (done) => {
        chai
            .request(app)
            .get('/api/type')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(5); // Здесь указывайте ожидаемое количество типов

                done();
            });
    });
});

describe('POST /api/type', () => {
    it('should create a new food type', (done) => {
        const newType = {
            name_type: 'Тест'
        };
        const generateJwt = (id, email, role) => {
            return jwt.sign(
                {id, email, role},
                process.env.SECRET_KEY,
                {expiresIn: '1h'} // сколько живет токен
            )
        }
        const adminToken = generateJwt(2, 'admin@mail.ru', 'ADMIN'); // Пример токена администратора

        chai
            .request(app)
            .post('/api/type')
            .set('Authorization', `Bearer ${adminToken}`) // Установка заголовка Authorization с токеном
            .send(newType)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.name_type).to.equal(newType.name_type);

                done();
            });
    });
});

describe('GET /api/type', () => {
    it('should return all food types', (done) => {
        chai
            .request(app)
            .get('/api/type')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');

                done();
            });
    });
});

describe('DELETE /api/type', () => {
    it('should delete a food type', (done) => {
        const typeToDelete = {
            name_type: 'Тест'
        };
        const generateJwt = (id, email, role) => {
            return jwt.sign(
                {id, email, role},
                process.env.SECRET_KEY,
                {expiresIn: '1h'} // сколько живет токен
            )
        }
        const adminToken = generateJwt(2, 'admin@mail.ru', 'ADMIN'); // Пример токена администратора

        chai
            .request(app)
            .delete('/api/type')
            .set('Authorization', `Bearer ${adminToken}`) // Установка заголовка Authorization с токеном
            .send(typeToDelete)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.equal('Тип успешно удален');

                done();
            });
    });
});