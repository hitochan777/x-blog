import '../styles/global.css'
import 'katex/dist/katex.css'
import { DefaultSeo } from 'next-seo'
import Footer from '../components/footer'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'space-between',
        }}
      >
        <DefaultSeo />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  )
}
