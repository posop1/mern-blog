import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../../redux/features/post/postSlice'
import axios from '../../utils/axios'
import s from './EditPostPage.module.scss'

export const EditPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setTitle(data.title)
    setText(data.text)
    setOldImage(data.imgUrl)
  }, [params.id])

  const submitHandler = () => {
    try {
      const updatedPost = new FormData()
      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('id', params.id)
      updatedPost.append('image', newImage)
      dispatch(updatePost(updatedPost))
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  const clearFormHandler = () => {
    setTitle('')
    setText('')
  }

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  return (
    <div className="container">
      <form
        className={s.AddPostPage}
        onSubmit={(e) => e.preventDefault()}
      >
        <label>
          Заголовок поста:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок"
            className={s.input}
          />
        </label>

        <label>
          Текст поста:
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Текст поста"
            className={s.input__area}
          />
        </label>

        <div className="flex gap-8 items-center justify-center mt-4">
          <button
            onClick={submitHandler}
            className={s.btns}
          >
            Обновить
          </button>

          <button
            onClick={clearFormHandler}
            className={s.btns}
          >
            Отменить
          </button>
        </div>
      </form>
    </div>
  )
}
