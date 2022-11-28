import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../redux/features/post/postSlice'
import s from './AddPostPage.module.scss'

export const AddPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = () => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('image', image)
      dispatch(createPost(data))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const clearFormHandler = () => {
    setText('')
    setTitle('')
  }

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
            placeholder="Заголовок..."
            className={s.input}
          />
        </label>

        <label>
          Текст поста:
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Текст поста..."
            className={s.input__area}
          />
        </label>

        <div>
          <button
            onClick={submitHandler}
            className={s.btns}
          >
            Добавить
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
