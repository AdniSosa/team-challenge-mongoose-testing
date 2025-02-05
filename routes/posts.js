// Aquí estarán todas las rutas

// - POST /create: Endpoint para crear una publicación.
// - GET /: Endpoint para traer todas las publicaciones.
// - GET /id/:_id: Endpoint para buscar publicación por id.
// - GET /title/:title: Endpoint para buscar una publicación por su titulo.
// - PUT /id/:_id: Endpoint para actualizar una publicación.
// - DELETE /id/:_id: Endpoint para eliminar una publicación.

const express = require('express');
const router = express.Router();
const Post = require('../models/Post')


// - POST /create: Endpoint para crear una publicación.
router.post('/create', async (req, res) => {
    try {
        const postCreated = await Post.create(req.body);
        console.log(postCreated)
        res.status(201).json(postCreated);
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'There was a problem trying to create a new post'})
    }
})

// - GET /: Endpoint para traer todas las publicaciones.
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'There was a problem getting posts'})
    }
})

// - GET /id/:_id: Endpoint para buscar publicación por id.
router.get('/id/:_id', async (req, res) => {
    
    try {
        const id = req.params._id;
        const post = await Post.findById(id);
        //console.log(task)
      
       if(!post) {
        res.json({message:'The post couldn´t be found'})
      } else {
        res.status(200).json(post);
      }
    
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem getting the post" });
    }
})

// - GET /title/:title: Endpoint para buscar una publicación por su titulo.
router.get('/title/:title', async (req, res) => {
    
    try {
        const title = req.params.title;
        const post = await Post.find({title: title});
        //console.log(task)
      
       if(!post) {
        res.json({message:'The post couldn´t be found'})
      } else {
        res.status(200).json(post);
      }
    
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem getting the post" });
    }
})

// - PUT /id/:_id: Endpoint para actualizar una publicación.
router.put('/id/:_id', async (req, res) => {
    
    try {
        const id = req.params._id;
        const postUpdate = await Post.findByIdAndUpdate(id, {title: req.body.title, body: req.body.body}, {new: true});
        //console.log(taskUpdate)
      
       if(!postUpdate) {
        res.status(404).json({message:'The post couldn´t be found'})
      } else {
        res.status(200).json(postUpdate);
      }
    
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem updating the post" });
    }
})

// - DELETE /id/:_id: Endpoint para eliminar una publicación.
router.delete('/id/:_id', async (req, res) => {
    
    try {
        const postDelete = await Post.findByIdAndDelete(req.params._id);
        //console.log(postDelete)
        
        if(!postDelete) {
            res.json({message:'The post couldn´t be found'})
          } else {
            res.status(200).json({message:'The post has been deleted'});
          }

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem deleting the post" });
    }
})

module.exports = router;
