import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { AiFillDelete, AiFillEye, AiOutlineMessage, AiTwotoneEdit } from 'react-icons/ai'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CommentItem } from '../../components/CommentItem'
import { createComment, getPostComments } from '../../redux/features/comment/commentSlice'
import { removePost } from '../../redux/features/post/postSlice'
import axios from '../../utils/axios'
import s from './PostPage.module.scss'

export const PostPage = () => {
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')

  const { user } = useSelector((state) => state.auth)
  const { comments } = useSelector((state) => state.comment)
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id))
      toast('Пост был удален')
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = () => {
    try {
      const postId = params.id
      dispatch(createComment({ postId, comment }))
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id))
    } catch (error) {
      console.log(error)
    }
  }, [params.id, dispatch])

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setPost(data)
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  if (!post) {
    return <div className={s.loading}>Загрузка...</div>
  }
  return (
    <div className={s.PostPage}>
      <div className="container">
        <div className={s.inner}>
          <Link
            className={s.back_btn}
            to={'/'}
          >
            Назад
          </Link>

          <div className={s.post}>
            <div className={s.post__info__container}>
              <div className={s.img__container}>
                {post?.imgUrl && (
                  <img
                    src={`http://localhost:3002/${post.imgUrl}`}
                    alt="img"
                    className="object-cover w-full"
                  />
                )}
              </div>

              <div className={s.user__date}>
                <p>{post.username}</p>
                <p>
                  <Moment
                    date={post.createdAt}
                    format="D MMM YYYY"
                  />
                </p>
                <div className={s.comments__stat}>
                  <p>
                    <AiFillEye /> <span>{post.views}</span>
                  </p>
                  <p>
                    <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
                  </p>
                </div>
              </div>
              <div className={s.main__info}>
                <h3 className="text-white text-xl">{post.title}</h3>
                <p className={s.text}>{post.text}</p>
              </div>
            </div>
            <div className={s.commets__container}>
              {user?._id === post.author && (
                <div className={s.change__post}>
                  <button>
                    <Link to={`/${params.id}/edit`}>
                      <AiTwotoneEdit />
                    </Link>
                  </button>
                  <button onClick={removePostHandler}>
                    <AiFillDelete />
                  </button>
                </div>
              )}
              <form
                className={s.commets__form}
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Текст коментария..."
                  className={s.comments__inp}
                />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={s.comments__btn}
                >
                  Оставить коментарий
                </button>
              </form>
              <div className={s.comments__list}>
                {comments?.map((cmt) => (
                  <CommentItem
                    key={cmt._id}
                    cmt={cmt}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
