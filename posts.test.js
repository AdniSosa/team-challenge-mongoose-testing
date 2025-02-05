const request = require("supertest");
const app = require("./index");
const Post = require('./models/Post')

describe('POST /create', () => {
    afterAll(() => {
        return Post.deleteMany();
      });
    
    const post = {
        title: 'Hello Spring!',
        body: 'The winter is leaving finally'
    }

        it('Should create a post', async () => {
            const resPost = await request(app)
            .post('/create')
            .send(post)
            expect(resPost.statusCode).toBe(201);
            expect(resPost.body.title).toBe('Hello Spring!'); 
            expect(resPost.body.body).toBe('The winter is leaving finally'); 
            
            //console.log(resPost)
        })
})

describe('GET /', () => {

    it('Should get all posts', async () => {
      const resPost = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);
      expect(Array.isArray(resPost.body)).toBeTruthy()
    });
  });

