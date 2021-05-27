// Uncomment below prior to testing

// const app = require('../server/server.js');
// const supertest = require('supertest');
// const request = supertest(app);
// const mongoose = require('mongoose');
// const MONGO_URI = 'mongodb+srv://miguelg:codesmith@cluster0.qtvtv.mongodb.net/wastelessv2?retryWrites=true&w=majority';


  describe('Route integration', () => {

    describe('/', () => {
      describe('GET', () => {
        
        xit('responds with 200 status and text/html content type', () => {
          request.
          get('/').
          expect('Content-Type', /text\/html/).
          expect(200)
        });
      });
    });

    describe('/api/', () => {

      beforeAll(() => {
        mongoose.connect(MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          dbName: 'wastelessv2',
        })
        .then(() => console.log('Connected to Mongo DB.'))
        .catch((err) => console.log(err));
      });
      
      describe('POST', () => {
        it('adds data to the database', (done) => {
          request
          .post('/api/food')
          .expect('Content-Type', /application\/json/)
          .send({item: 'cookies'})
          .then(response => {
            expect(response.body).toMatchObject({item: 'cookies'});
            done();
          })
          .catch(err => done(err))
        })
      })

      describe('PUT', () => {
        it('successfully updates item status', (done) => {
          request
          .put('/api/food/purchased/cookies')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .then(response => {
            expect(response.body).toEqual({message: 'updated status to purchased'});
            done();
          })
          .catch(err => {
            done(err);
          })
        })
      })
    })

    describe('DELETE', () => {
      it('successfully deletes an item', (done) => {
        request
        .delete('/api/food/apple')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .then(response => {
          expect(response.body).toEqual({ message: 'deleted' });
          done();
        })
        .catch(err => {
          done(err);
        })
      })
    })
  

    afterAll(() => { 
      mongoose.connection.close();
    })
  })