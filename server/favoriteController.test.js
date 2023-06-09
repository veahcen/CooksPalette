const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./index'); // Подключение вашего приложения Express
const { Food, FavoritesFood, Favorites } = require('./models/models');
const jwt = require('jsonwebtoken')

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/favorite', () => {
    it('should get favorite foods for the user', (done) => {
        const generateJwt = (id, email, role) => {
            return jwt.sign(
                { id, email, role },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            );
        };

        const userToken = generateJwt(1, 'user@mail.ru', 'USER');

        chai
            .request(app)
            .get('/api/favorite')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');

                done();
            });
    });
});