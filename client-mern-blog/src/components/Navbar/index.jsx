import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkIsAuth, logout } from '../../redux/features/auth/authSlice'
import s from './Navbar.module.scss'

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()

  const activeStyles = {
    color: 'white'
  }

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Вы вышли из системы')
  }

  return (
    <div className={s.navbar}>
      <div className="container">
        <div className={s.inner}>
          <span className={s.logo}>БЛОГ</span>

          {isAuth && (
            <ul className={s.nav}>
              <li>
                <NavLink
                  to={'/'}
                  href="/"
                  className={s.link}
                  style={({ isActive }) => (isActive ? activeStyles : undefined)}
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/posts'}
                  href="/"
                  className={s.link}
                  style={({ isActive }) => (isActive ? activeStyles : undefined)}
                >
                  Мои посты
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/new'}
                  href="/"
                  className={s.link}
                  style={({ isActive }) => (isActive ? activeStyles : undefined)}
                >
                  Добавить пост
                </NavLink>
              </li>
            </ul>
          )}

          <div className={s.auth__container}>
            {isAuth ? (
              <button
                onClick={logoutHandler}
                className={s.auth__btn}
              >
                Выйти
              </button>
            ) : (
              <Link
                to={'/login'}
                className={s.auth__btn}
              >
                {' '}
                Войти{' '}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
