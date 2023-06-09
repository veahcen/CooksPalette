const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./index'); // Подключение вашего приложения Express
const { Food } = require('./models/models');
const jwt = require('jsonwebtoken')

// Подключение Chai в Mocha
chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/food', () => {
    it('should get all foods', (done) => {
        chai
            .request(app)
            .get('/api/food')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.count).to.be.a('number');
                expect(res.body.rows).to.be.an('array');

                done();
            });
    });
});

describe('GET /api/food/:id', () => {
    it('should get a specific food', (done) => {
        const foodId = 3;

        chai
            .request(app)
            .get(`/api/food/${foodId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.id).to.equal(foodId);

                done();
            });
    });
});
