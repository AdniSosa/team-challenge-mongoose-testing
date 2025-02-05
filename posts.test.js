const request = require("supertest");
const app = require("./index");
const Post = require('./models/Post')

describe('/create', () => {
    afterAll(() => {
        return Post.deleteMany();
      });
    
    const post = {
        title,
        body
    }
    /* it('Should create a post', async () => {
        let postCreate = await Post.countDocuments({});
        
        //expect(postCreate).toBe(0);
        const resPost = await request(app).post('/create').send(post).expect(201);

        postCreate = await Post.countDocuments({});
        expect(postCreate).toBe(1);
    }) */

        it('Should create a post', async () => {
            const resPost = await request(app).post('/create').send(post).expect(201);
            console.log(resPost)
            expect(resPost.body.post._id).toBeDefined();
            expect(resPost.body.post.createdAt).toBeDefined();
            expect(resPost.body.post.updatedAt).toBeDefined();
        })
})


