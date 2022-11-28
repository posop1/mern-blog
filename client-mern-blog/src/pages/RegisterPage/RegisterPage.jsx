import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkIsAuth, registerUser } from '../../redux/features/auth/authSlice'
import s from './RegisterPage.module.scss'

export const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { status } = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (status) {
      toast(status)
    }
    if (isAuth) navigate('/')
  }, [
    status,
    isAuth,
    navigate
  ])

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }))
      setPassword('')
      setUsername('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <form
        onSubmit={(e) => e.preventDefault()}
        className={s.inner}
      >
        <h1 className="text-lg text-white text-center">Регистрация</h1>
        <label className={s.forms}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Логин..."
            className={s.inputs}
          />
        </label>

        <label className={s.forms}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль..."
            className={s.inputs}
          />
        </label>

        <div className="flex gap-8 justify-center mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className={s.form__btn}
          >
            Подтвердить
          </button>
          <Link
            to="/login"
            className="flex justify-center items-center text-xs text-white"
          >
            Уже зарегистрированы ?
          </Link>
        </div>
      </form>
    </div>
  )
}
