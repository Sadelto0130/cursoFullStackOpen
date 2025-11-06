import { Router } from "express";
import { Blog } from "../models/blog.js";
import { error } from "../utils/logger.js";

const blogRouter = Router()

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const {title, author, url, likes} = request.body

  const blog = new Blog({title, author, url, likes})
  
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogRouter.get('/:id', (req, resp) => {
  const id = req.params.id
  Blog.findById(id)
    .then(blog => {
      if(blog) {
        return resp.json(blog)
      } else {
        return resp.status(404).json({message: "Not find"})
      }
    })
    .catch(err => error(err))
})

blogRouter.delete('/:id', (req, res) => {
  const id = req.params.id
  Blog.findByIdAndDelete(id)
    .then(() => {
      return res.status(204).end()
    })
    .catch(err => error(err))
})

blogRouter.put('/:id', (req, res) => {
  const id = req. params.id
  const {title, author, url, likes} = req.body

  if(!title || !author || !url || likes === undefined){
    error("missing data")
    return res.status(400).json({message: "missing data"})
  }

  const blog = {title, author, url, likes}

  Blog.findByIdAndUpdate(
    id,
    blog,
    {new: true, runValidators: true, context: 'query'}
  )
    .then(blogUpdate => {
      if(blogUpdate) {
        return res.json(blogUpdate)
      } else {
        return res.status(404).json({message: "Not find"})
      }
    })
    .catch(err => error(err))
})

export default blogRouter