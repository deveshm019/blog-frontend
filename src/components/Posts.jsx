import React, { useEffect } from 'react'
import { useState } from 'react'
import PostItem from './PostItem'
import Loader from "./Loader"
import axios from 'axios'
//import {Dummy_Posts} from "../data.js"

const Posts = () => {

    const [posts,setPosts] = useState([]);
    const [isLoading,setIsloading] = useState(false)

    useEffect(()=>{
      const fetchPosts = async()=>{
        setIsloading(true)
        try {
          const response = await axios.get(`https://blog-backend-kyxz.onrender.com/api/posts`)
          setPosts(response?.data)
        } catch (error) {
          console.log(error)
        }
        setIsloading(false)
      }
      fetchPosts();
    },[])

    if(isLoading){
      return <Loader/>
    }
  return (
    <section className="posts">
        {posts.length > 0 ?<div className="container posts-container">
        {
            posts.map(({_id: id,thumbnail,category,title,desc,creator,createdAt})=><PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} desc={desc} authorID={creator} createdAt={createdAt}/>)
        }
        </div>:<h2 className='center'>No Posts Found!</h2>}
    </section>
  )
}

export default Posts
