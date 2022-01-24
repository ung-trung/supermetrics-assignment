import { useAppDispatch, useAppSelector } from '@src/app/hooks'
import { fetchPosts } from '@src/features/post/postSlice'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import styles from 'src/styles/Home.module.css'

const IndexPage: NextPage = () => {
  const hasToken = useAppSelector((state) => Boolean(state.auth.token))
  const router = useRouter()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!hasToken) {
      router.push('/login')
    }
  }, [hasToken])
  useEffect(() => {
    dispatch(fetchPosts())
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Trung Ung | Assignment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export default IndexPage
