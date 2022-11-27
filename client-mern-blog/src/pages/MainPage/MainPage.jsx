import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../../components/PopularPosts'
import { PostItem } from '../../components/PostItem/'
import { getAllPosts } from '../../redux/features/post/postSlice'
import s from './MainPage.module.scss'

export const MainPage = () => {
  const dispatch = useDispatch()
  const { posts, popularPosts } = useSelector((state) => state.post)

  console.log(popularPosts)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if (!posts.length) {
    return (
      <div className={s.notfound__container}>
        <p className={s.notfound__text}>Постов не существует.</p>
      </div>
    )
  }

  return (
    <div className={s.MainPage}>
      <div className="container">
        <div className={s.inner}>
          <div className={s.post__list}>
            {posts?.map((post, idx) => (
              <PostItem
                key={idx}
                post={post}
              />
            ))}
          </div>
          <div className={s.popular__list}>
            <p className={s.popular__text}>Популярное:</p>

            {popularPosts?.map((post, idx) => (
              <PopularPosts
                key={idx}
                post={post}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
