import '../styles/global.css'
import 'katex/dist/katex.css'
import { DefaultSeo } from 'next-seo'
import Footer from '../components/footer'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
