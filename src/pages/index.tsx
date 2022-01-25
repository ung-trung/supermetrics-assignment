import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@src/app/hooks'
import { fetchPosts } from '@src/features/post/postSlice'
import PostList from '@src/features/post/UserPostList'
import UserList from '@src/features/post/UserList'
import UserFilter from '@src/features/filter/UserFilter'
import PostFilter from '@src/features/filter/PostFilter'
import PostDirection from '@src/features/filter/PostDirection'
import styles from '@src/styles/Home.module.css'

const IndexPage: NextPage = () => {
  const hasToken = useAppSelector((state) => Boolean(state.auth.token))
  const isLoading = useAppSelector((state) => state.post.isLoading)

  const router = useRouter()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!hasToken) {
      router.push('/login')
    } else {
      dispatch(fetchPosts())
    }
  }, [hasToken])

  if (isLoading) {
    return <div className="container">Loading...</div>
  }

  return (
    <div className="container">
      <Head>
        <title>Trung Ung | Assignment</title>
        <meta name="description" content="Supermetrics Assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.gridContainer}>
        <div>
          <div className={styles.postFilterOptions}>
            <UserFilter />
          </div>
          <UserList />
        </div>
        <div>
          <div className={styles.postFilterOptions}>
            <PostFilter />
            <PostDirection />
          </div>
          <PostList></PostList>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
