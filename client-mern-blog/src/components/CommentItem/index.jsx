import React from 'react'
import s from './CommentItem.module.scss'

export const CommentItem = ({ cmt }) => {
  const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)
  return (
    <div className={s.postItem}>
      <div className={s.avatar}>{avatar}</div>
      <p className={s.comment}>{cmt.comment}</p>
    </div>
  )
}
