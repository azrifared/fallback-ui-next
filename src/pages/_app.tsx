
import type { AppProps } from 'next/app'
import { initializeIcons } from '@fluentui/font-icons-mdl2'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import ErrorBoundary from '../components/ErrorBoundary'
import { DefaultTheme } from '../components/Theme'
import '../common/style.css'

initializeIcons(undefined, { disableWarnings: true })

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <title>Fallback</title>
      </Head>
      <RecoilRoot>
        <ErrorBoundary>
          <DefaultTheme>
            <Component {...pageProps} />
          </DefaultTheme>
        </ErrorBoundary>
      </RecoilRoot>
    </>
  )
}

export default App