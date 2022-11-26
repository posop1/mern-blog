import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Layout } from './components/Layout.jsx'
// import { AddPostPage } from './pages/AddPostPage'
// import { EditPostPage } from './pages/EditPostPage'
// import { LoginPage } from './pages/LoginPage'
// import { MainPage } from './pages/MainPage/MainPage'
// import { PostPage } from './pages/PostPage'
// import { PostsPage } from './pages/PostsPage'
// import { RegisterPage } from './pages/RegisterPage'
import {
  AddPostPage,
  EditPostPage,
  LoginPage,
  MainPage,
  PostPage,
  PostsPage,
  RegisterPage
} from './pages'
import { getMe } from './redux/features/auth/authSlice.js'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route
          path="posts"
          element={<PostsPage />}
        />
        <Route
          path=":id"
          element={<PostPage />}
        />
        <Route
          path=":id/edit"
          element={<EditPostPage />}
        />
        <Route
          path="new"
          element={<AddPostPage />}
        />
        <Route
          path="register"
          element={<RegisterPage />}
        />
        <Route
          path="login"
          element={<LoginPage />}
        />
      </Routes>

      <ToastContainer position="bottom-right" />
    </Layout>
  )
}

export default App
