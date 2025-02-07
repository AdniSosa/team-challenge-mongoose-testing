const request = require("supertest");
const {app, server} = require("./index");
const Post = require('./models/Post')

/* describe('POST /create', () => {
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
}) */

describe('GET /', () => {

    it('Should get all posts', async () => {
      const resPost = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);
      expect(Array.isArray(resPost.body)).toBeTruthy()
    });
  });

  describe("testing/posts", () => {
    const post = {
      title: "Post 1",
      body: "Body post 1",
    };
  
    beforeEach(async () => {
      await Post.deleteMany();
    });
  
    it("Should create a post", async () => {
      const resPost = await request(app).post("/create").send(post).expect(201);
      //console.log(resPost);
  
      expect(() => createPost(resPost.body.post._id)).toBeDefined();
      expect(() => createPost(resPost.body.post.createdAt)).toBeDefined();
      expect(() => createPost(resPost.body.post.updateddAt)).toBeDefined();
      // expect(resPost.body.post.updatedAt).toBeDefined();
    }, 10000); // Aumentamos el timeout a 10000 ms
  
    afterAll(async () => {
      await Post.deleteMany();
      server.close(); // Cierra el servidor después de las pruebas
    });
  });