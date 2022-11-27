import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import s from './PostItem.module.scss'

export const PostItem = ({ post }) => {
  if (!post) {
    return <div className={s.loading}>Загрузка...</div>
  }
  return (
    <Link to={`/${post._id}`}>
      <div className={s.PostItem}>
        <div className={s.inner}>
          <div className={s.info__container}>
            <p className={s.username}>{post.username}</p>
            <p className={s.time}>
              <Moment
                date={post.createdAt}
                format="D MMM YYYY"
              />
            </p>
          </div>
          <div className={s.main__info}>
            <h3 className={s.title}>{post.title}</h3>
            <p className={s.text}>{post.text}</p>

            <div className={s.views__comments__container}>
              <div className={s.views__comments}>
                <AiFillEye size={18} /> <span>{post.views}</span>
              </div>
              <div className={s.views__comments}>
                <AiOutlineMessage size={18} /> <span>{post.comments?.length || 0} </span>
              </div>
            </div>
          </div>
        </div>

        <div className={s.img__container}>
          {post.imgUrl && (
            <img
              src={`http://localhost:3002/${post.imgUrl}`}
              alt="img"
              className={s.img}
            />
          )}
        </div>
      </div>
    </Link>
  )
}
