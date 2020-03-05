// This one is the default NextJS entrypoint
// Global styles lie here

import 'styles/normalize.sass'
import 'styles/font-face.css'

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}