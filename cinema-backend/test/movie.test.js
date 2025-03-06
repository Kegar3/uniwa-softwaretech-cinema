const request = require('supertest');
const app = require('../server'); // Ensure this points to your Express app
const sequelize = require('../config/config');
const Movie = require('../models/Movie');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const chai = require('chai');

let expect;

describe('Movie API', () => {
  let adminToken;
  let userToken;

  before(async () => {
    // Dynamically import chai
    
    expect = chai.expect;

    await sequelize.sync({ force: true });

    const hashedPassword = await bcrypt.hash('password', 10);

    const admin = await User.create({
      username: 'admintest',
      email: 'admintest@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    const user = await User.create({
      username: 'usertest',
      email: 'usertest@example.com',
      password: hashedPassword,
      role: 'user',
    });

    adminToken = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    userToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  describe('POST /movies', () => {
    it('should create a new movie', async () => {
      const res = await request(app)
        .post('/movies')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Inception',
          genre: 'Sci-Fi',
          duration: 148,
          release_date: '2010-07-16',
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('id');
      expect(res.body.title).to.equal('Inception');
    });

    it('should not allow a non-admin to create a movie', async () => {
      const res = await request(app)
        .post('/movies')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Interstellar',
          genre: 'Sci-Fi',
          duration: 169,
          release_date: '2014-11-07',
        });

      expect(res.status).to.equal(403);
    });
  });

  describe('GET /movies', () => {
    it('should get all movies', async () => {
      const res = await request(app).get('/movies');

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
    });
  });

  describe('GET /movies/:id', () => {
    it('should get a movie by id', async () => {
      const movie = await Movie.create({
        title: 'The Matrix',
        genre: 'Sci-Fi',
        duration: 136,
        release_date: '1999-03-31',
      });

      const res = await request(app).get(`/movies/${movie.id}`);

      expect(res.status).to.equal(200);
      expect(res.body.title).to.equal('The Matrix');
    });

    it('should return 404 if movie not found', async () => {
      const res = await request(app).get('/movies/9999');

      expect(res.status).to.equal(404);
    });
  });

  describe('PUT /movies/:id', () => {
    it('should update a movie', async () => {
      const movie = await Movie.create({
        title: 'Avatar',
        genre: 'Sci-Fi',
        duration: 162,
        release_date: '2009-12-18',
      });

      const res = await request(app)
        .put(`/movies/${movie.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Avatar Updated',
        });

      expect(res.status).to.equal(200);
      expect(res.body.title).to.equal('Avatar Updated');
    });

    it('should return 404 if movie not found', async () => {
      const res = await request(app)
        .put('/movies/9999')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Non-existent Movie',
        });

      expect(res.status).to.equal(404);
    });
  });

  describe('DELETE /movies/:id', () => {
    it('should delete a movie', async () => {
      const movie = await Movie.create({
        title: 'Titanic',
        genre: 'Romance',
        duration: 195,
        release_date: '1997-12-19',
      });

      const res = await request(app)
        .delete(`/movies/${movie.id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).to.equal(200);
    });

    it('should return 404 if movie not found', async () => {
      const res = await request(app)
        .delete('/movies/9999')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).to.equal(404);
    });
  });
});