import { Component, PureComponent } from "react"
import { withRouter } from 'next/router'

import Layout from 'components/Layout'
import Rating from 'components/Rating'
import RatingSelect from 'components/RatingSelect'
import Comment from 'components/Comment'
import Input from 'components/Input'

import { getGameById } from 'api/queries'

import 'styles/GamePage.sass'

class GamePage extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            data: null
        }
    }  

    render() {
        console.log(this.props.game)

        let {
            title, 
            description,
            release_date,
            user_rating,
            critic_rating,
            poster_url,
            studio,
            publisher,
            age_restriction,
            genres,
            platforms
        } = this.props.game

        let comment = {
            username: 'pavel_0806',
            time: '31 March',
            body: `Эта игра сделала из меня человека. До этого я был простым 
            продавцом хлеба.Но как только мои глаза открылись, я уже не смог жить как прежде.`,
            likes: 4
        }

        return(
            <Layout>
                <div className='game-page'>
                    <p className='title'>{title}</p>
                    <div className='poster-info'>
                        <img className='poster' src={'/' + poster_url}></img>
    
                        <div className='info'>
                            {critic_rating ?
                                <div className='rating'>
                                    <Rating>{critic_rating}</Rating>
                                    <span className='rating-description'>рейтинг критиков</span>
                                </div> : ''
                            }
                            {user_rating ?
                                <div className='rating'>
                                    <Rating>{user_rating}</Rating>
                                    <span className='rating-description'>рейтинг пользователей</span>
                                </div> : ''
                            }
                            <div className='info-table'>
                                <div className='info-table__row'>
                                    <span className='table-label'>жанр</span>
                                    <span className='table-value'>{genres.map(el => el.name).join(', ')}</span>
                                </div>
                                <div className='info-table__row'>
                                    <span className='table-label'>возрастное ограничение</span>
                                    <span className='table-value'>{age_restriction.name}</span>
                                </div>
                                <div className='info-table__row'>
                                    <span className='table-label'>разработчик</span>
                                    <span className='table-value'>{studio.name}</span>
                                </div>
                                <div className='info-table__row'>
                                    <span className='table-label'>издатель</span>
                                    <span className='table-value'>{publisher.name}</span>
                                </div>
                                <div className='info-table__row'>
                                    <span className='table-label'>год</span>
                                    <span className='table-value'>{new Date(release_date).getFullYear()}</span>
                                </div>
                                <div className='info-table__row'>
                                    <p className='table-label'>платформа</p>
                                    <p className='table-value'>{platforms.map(el => el.name).join(', ')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='description'>{description}</p>
                    <div className='div-line'></div>
                    <RatingSelect
                        userRating={"4.3"}   
                    />
                    <div className='div-line'></div>
                    <p>Поделиться в соцсетях</p>
                    <div className='div-line'></div>
                    <div className='game-page__comment-section'>
                        <Comment comment={comment}> </Comment>
                        <Input></Input>
                    </div>

                </div>
            </Layout>
        )
    }
}

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

export async function getServerSideProps(context){
    let id_slug = context.params.id_slug
    let id = id_slug.split('-')[0]
    let game = await getGameById(id)
    game = await game.json()

    return {props: {game: await game}}
}