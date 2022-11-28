import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkIsAuth, loginUser } from '../../redux/features/auth/authSlice'
import s from './LoginPage.module.scss'

export const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { status } = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (status) toast(status)
    if (isAuth) navigate('/')
  }, [
    status,
    isAuth,
    navigate
  ])

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container">
      <div className={s.inner}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={s.inner}
        >
          <h1>Авторизация</h1>
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

          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className={s.form__btn}
            >
              Войти
            </button>
            <Link
              to="/register"
              className={s.reg__link}
            >
              Нет аккаунта ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
