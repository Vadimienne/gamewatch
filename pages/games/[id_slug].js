// import { PureComponent } from "react"
// import { withRouter } from 'next/router'

// import Layout from 'components/Layout'

// import { getGameById } from 'api/queries'

// function gamePage(props) {

//     // static async getStaticPaths(){
//     //     return {
//     //         paths: [
//     //             { id_slug: '32-reddeadredemption' }
//     //         ],
//     //         fallback: false
//     //       }
//     // }

//     // static async getStaticProps(context){
//     //     console.log('CONTEXT: ', context)
//     //     let game = await getGameById('40')
//     //     game = await game.json()
//     //     return {props: {data: await game[0].title}}

//     // }

//     // static async getServerSideProps(){
//     //     let game = await getGameById('40')
//     //     game = await game.json()
//     //     return {props: {data: 'im server side data'}}
//     // }


    
//     // const router = useRouter()
//     console.log('hello: ', props)
//     //<div>{this.props.game.title}</div>
//     let data = props.data? props.data: 'No Data'
//     return(
//         <Layout>
//             <div>{data}</div>
//         </Layout>
//     )
// }

// // export async function getStaticPaths(){
// //     return {
// //         paths: [
// //             { id_slug: '32-reddeadredemption' }
// //         ],
// //         fallback: false
// //       }
// // }

// // export async function getStaticProps(context){
// //     console.log('CONTEXT: ', context)
// //     let game = await getGameById('40')
// //     game = await game.json()
// //     return {props: {data: await game[0].title}}

// // }

// export async function getServerSideProps(){
//     let game = await getGameById('40')
//     game = await game.json()
//     return {props: {data: 'SSR DATA'}}
// }

// export default gamePage

// // export async function getStaticPaths(){
// //     return {
// //         paths: [
// //           { params: { id_slug: '32-reddeadredemption' } }
// //         ],
// //         fallback: false
// //       }
// // }

// // export async function getStaticProps(context){
// //     console.log('CONTEXT: ', context)
// //     let game = await getGameById('40')
// //     game = await game.json()
// //     return {props: {game: await game}}

// // }

// // export async function getServerSideProps(){
// //     let game = await getGameById('40')
// //     game = await game.json()
// //     return {props: {game: await game}}
// // }



























import { Component, PureComponent } from "react"
import { withRouter } from 'next/router'

import Layout from 'components/Layout'

import { getGameById } from 'api/queries'

class GamePage extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            data: null
        }
    }

    // static async getStaticPaths(){
    //     return {
    //         paths: [
    //             { id_slug: '32-reddeadredemption' }
    //         ],
    //         fallback: false
    //       }
    // }

    // static async getStaticProps(context){
    //     console.log('CONTEXT: ', context)
    //     let game = await getGameById('40')
    //     game = await game.json()
    //     return {props: {data: await game[0].title}}

    // }

    // static async getServerSideProps(ctx){
    //     return {props: {data: 'im server side data'}}
    // }

    

    render(){
        // const router = useRouter()
        console.log('hello: ', this.props)
        //<div>{this.props.game.title}</div>
        let data = this.props.data? this.props.data: this.state.data
        return(
            <Layout>
                <div>{data}</div>
            </Layout>
        )
    }
}

// export async function getServerSideProps(){
//     // let game = await getGameById('40')
//     // game = await game.json()
//     return {props: {data: 'im SSR'}}
// }

export default withRouter(GamePage)

// export async function getStaticPaths(){
//     return {
//         paths: [
//           { params: { id_slug: '32-reddeadredemption' } }
//         ],
//         fallback: false
//       }
// }

// export async function getStaticProps(context){
//     // console.log('CONTEXT: ', context)
//     let game = await getGameById('40')
//     game = await game.json()
//     return {props: {data: await game[0].title}}

// }

export async function getServerSideProps(){
    let game = await getGameById('40')
    game = await game.json()
    return {props: {data: await game[0].title}}
}