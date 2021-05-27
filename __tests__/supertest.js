const app = require('../server/server.js')
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://miguelg:codesmith@cluster0.qtvtv.mongodb.net/wastelessv2?retryWrites=true&w=majority';

describe('Route integration', () => {
  
  describe('/', () => {
    describe('GET', () => {
      xit('responds with 200 status and text/html content type', () => {
        request
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200)
      });
    });
  });
})

  describe('/api/', () => {

    beforeAll(() => {
      mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'wastelessv2',
      })
      .then(() => console.log('Connected to Mongo DB.'))
      .catch((err) => console.log(err));
    })
    
    afterAll( () => {
       mongoose.connection.close();
    })

    describe('checking the post request', () => {
        it('adds data to the database', (done) => {
          request
          .post('/api/food')
          .expect('Content-Type',/application\/json/)
          .send({item: 'boba'})
          .then(response => {
            expect(response.body).toMatchObject({item: 'boba'});
            done();
          }).catch(err => {
            // done(err))
            console.log(err)
        })
    })
        it('responds with data from res.locals.food and moves banana to purchased', (done) => {
          request
          .put('/api/food/purchased/boba')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .then(response => {
            expect(response.body).toEqual({ message: 'updated status to purchased' });
            done();
          })
          .catch(err => {
            console.log(done(err));
          })       
        })
    })    

        it('deletes data from the database', (done) => {
          request
          .delete('/api/food/cake')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .then(response => {
            expect(response.body).toEqual({ message: 'deleted' });
            done()
          })
          .catch(err => {
            console.log(err);
        })
      })
    })

