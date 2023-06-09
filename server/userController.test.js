const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./index'); // Подключение вашего приложения Express
const { User } = require('./models/models');

// Подключение Chai в Mocha
chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /api/user/registration', () => {
    it('should register a new user', (done) => {
        const newUser = {
            email: 'test@example.com',
            password: 'testpassword'
        };

        chai
            .request(app)
            .post('/api/user/registration')
            .send(newUser)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.token).to.be.a('string');

                done();
            });
    });
});

describe('POST /api/user/login', () => {
    it('should log in an existing user', (done) => {
        const userCredentials = {
            email: 'test@example.com',
            password: 'testpassword'
        };

        chai
            .request(app)
            .post('/api/user/login')
            .send(userCredentials)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.token).to.be.a('string');

                done();
            });
    });
});

