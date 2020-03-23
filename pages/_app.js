// This one is the default NextJS entrypoint
// Global styles lie here

import { PureComponent } from "react"
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../redux/store'
// import App from 'next/app'
import 'styles/normalize.sass'
import 'styles/font-face.css'
//import { loadGetInitialProps } from 'next/dist/next-server/lib/utils'



class MyApp extends PureComponent{


    // static async loadGetInitialProps({Component, ctx}){
    //     const pageProps = Component.getInitialProps? await Component.getInitialProps
    // }

    render(){
        const { Component, pageProps, store } = this.props

        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        )
    }
}

export default withRedux(initStore)(MyApp)