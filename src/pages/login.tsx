import { NextPage } from 'next'
import LoginForm from '@src/features/auth/LoginForm'
import styles from '@src/styles/Login.module.css'
import { useAppSelector } from '@src/app/hooks'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Login: NextPage = () => {
  const hasToken = useAppSelector((state) => Boolean(state.auth.token))
  const router = useRouter()
  useEffect(() => {
    if (hasToken) {
      router.push('/')
    }
  }, [hasToken])

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | Assignment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginForm />
    </div>
  )
}

export default Login
