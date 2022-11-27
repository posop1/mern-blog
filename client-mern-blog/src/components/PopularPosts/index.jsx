import React from 'react'
import { Link } from 'react-router-dom'
import s from './PopularPosts.module.scss'

export const PopularPosts = ({ post }) => {
  return (
    <div className={s.PopularPosts}>
      <Link
        to={`${post._id}`}
        className={s.item}
      >
        {post.title}
      </Link>
    </div>
  )
}
