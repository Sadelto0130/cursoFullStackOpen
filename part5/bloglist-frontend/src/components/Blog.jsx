import { useState } from "react";

const Blog = ({ blog, updateLikes, removeBlog, userName}) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const detailsStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const noMargin = {
    margin: 0,
  };

  const handleLike = () => {
    const blogUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user?.id,
    };
    updateLikes(blog.id, blogUpdate)
  }

  const handleDelete = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      removeBlog(blog.id)
    }
  }
  return (
    <div style={blogStyle}>
      <p style={noMargin}>
        {blog?.title} {blog?.author} {" "}
        <button type="button" onClick={() => setVisible(!visible)}>{visible ? "hide" : "view"}</button>
      </p>
      { visible && ( 
         <div style={detailsStyle}>        
          <p style={noMargin}>{blog?.url}</p>
          <p style={noMargin}>
            Likes: {blog.likes}
            <button type="button" onClick={handleLike}>Like</button>
          </p>
          <p style={noMargin}>{blog.user?.name}</p>
          {
            userName === blog.user?.name && (
              <button type="button" onClick={handleDelete}>Remove</button>
            )             
          }
          
        </div>
      )}
    </div>
  );
};

export default Blog;
