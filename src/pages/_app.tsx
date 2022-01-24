import '@src/styles/globals.css'

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import store from '@src/app/store'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
