import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Blog from './Blog';


const UserBlogs = () => {
  const [blogs, setBlogs] = useState();


  const id = localStorage.getItem("userId");

  const fetchUserBlogs = async () => {
    const res = await axios
                          .get('http://localhost:5000/api/blog/user/62dce54d5b70927f5a844fdb')
                          .catch((error) => console.log(error));
    const data = await res.data;
    return data;
  }

  useEffect(() => {

    fetchUserBlogs().then(data => setBlogs(data.blogs));
  }, []);
console.log(blogs);
console.log(id);
 


  return (
    <div>
          {blogs && blogs.map((blog, index) =>(
          <Blog
          title={blog.title}
          description={blog.description}
          imageUrl={blog.image}
          userName={blog.user.name}
          />
        ))}
    </div>
  )
}

export default UserBlogs