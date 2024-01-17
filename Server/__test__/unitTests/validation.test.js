const express = require('express');
const supertest = require('supertest');
const { validate, validateLogin, validateRegister } = require('../../middleware/validationMiddleware/authValidation');

const app = express();
app.use(express.json());
const request = supertest(app);

app.post('/login', validateLogin, validate, (req, res) => {
    res.status(200).json({ msg: 'Login successful' });
})

app.post('/register', validateRegister, validate, (req, res) => {
    res.status(200).json({ msg: 'Registration successful' });
})

describe('Validation Middlewares', () => {
    it('should return 400 Bad Request for invalid login data', async () => {
      const response = await request
        .post('/login')
        .send({ email: 'invalidEmail', password: 'noPass' });
  
      expect(response.status).toBe(400);
    });

    it('should return 400 Bad Request for invalid registration data', async () => {
        const response = await request
          .post('/register')
          .send({ name: 'name', email: 'invalidEmail', phoneNumber: 'Number', password: 'nopass' });
    
        expect(response.status).toBe(400);
    });

    it('should return 200 OK for valid login data', async () => {
        const response = await request
          .post('/login')
          .send({ email: 'email@gamin.com', password: 'password' });

        expect(response.status).toBe(200);
    });

    it('should return 200 OK for valid registration data', async () => {
        const response = await request
          .post('/register')
          .send({ name: 'name', email: 'email@gmail.com', phoneNumber: '074535323', password: 'Password1!' });

        expect(response.status).toBe(200);
    });

    it('should return 400 Bad Request for empty login data', async () => {
        const response = await request
          .post('/login')
          .send({ email: '', password: '' });

        expect(response.status).toBe(400);
    });

    it('should return 400 Bad Request for empty registration data', async () => {
        const response = await request
          .post('/register')
          .send({ name: '', email: '', phoneNumber: '', password: '' });

        expect(response.status).toBe(400);
    });

})  

