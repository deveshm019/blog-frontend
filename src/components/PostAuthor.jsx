import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const PostAuthor = ({createdAt,authorID}) => {

  const [author, setAuthor] = useState({})

  useEffect(()=>{
    const getAuthor = async()=>{
      try {
        const response = await axios.get(`https://blog-backend-kyxz.onrender.com/api/users/${authorID}`)
        setAuthor(response?.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAuthor()
  },[])

  return (
    <Link to={`/posts/users/${authorID}`} className="post-author">
      <div className="post-author-avatar">
        <img src={`https://blog-backend-kyxz.onrender.com/uploads/${author?.avatar}`} alt="" />
      </div>
      <div className="post-avatar-details">
        <h5>By: {author.name}</h5>
        <small><ReactTimeAgo date={new Date(createdAt)} locale="en-IN"/></small>
      </div>
    </Link>
  )
}

export default PostAuthor
