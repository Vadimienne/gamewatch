const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gamewatch',
    password: 'divam',
    port: 5432
})

// USER
//
// 

// const createUser
// const updateUser
// const deleteUser
// const getUserById

//
//
// USER

// PUBLISHER
//
//

const getPublishers = (request, response) => {
    pool.query('SELECT * FROM  publishers')
        .then(result => response.status(200).json(result.rows))
        .catch(err => response.status(500).json({error: err}))
}

const createPublisher = (request, response) => {
    pool.query(`INSERT INTO publishers (name)
                VALUES ('${request.body.name}')`)
        .then(result => response.status(200).json(result.rows))
        .catch(err => response.status(500).json({error: err}))
}

const updatePublisher = (request, response) => {
    pool.query(`UPDATE publishers 
                SET name = ${request.body.name}
                WHERE id = ${request.body.id}`, 
        (err, result) => {
            if (err) {
                throw err
            }

            response.status(200).json(result.rows)
        }
    )
}

const deletePublisher = (request, response) => {
    pool.query(`DELETE FROM publishers 
                WHERE id = ${request.body.id}`, 
                (err, result) => {
                    if (err) {
                        throw err
                    }

                    response.status(200).json(result.rows)
                }
    )
}

//
//
// PUBLISHER

// AGE RESTRICTION
//
//

const getAgeRestrictions = (request, response) => {
    pool.query('SELECT * FROM  age_restrictions')
        .then(result => response.status(200).json(result.rows))
        .catch(err => response.status(500).json({error: err}))
}

const createAgeRestriction = (request, response) => {
    pool.query(`INSERT INTO age_restrictions (name, min_age)
                VALUES ('${request.body.name}', ${request.body.min_age})`, 
                (err, result) => {
                    if (err) {
                        throw err
                    }

                    response.status(200).json(result.rows)
    })
}

const updateAgeRestriction = (request, response) => {
    pool.query(`UPDATE age_restrictions 
                SET name = ${request.body.name},
                    min_age = ${request.body.min_age}
                WHERE id = ${request.body.id}`, 
                (err, result) => {
                    if (err) {
                        throw err
                    }

                    response.status(200).json(result.rows)
                }
    )
}

const deleteAgeRestriction = (request, response) => {
    pool.query(`DELETE FROM age_restrictions 
                WHERE id = ${request.body.id}`, 
                (err, result) => {
                    if (err) {
                        throw err
                    }

                    response.status(200).json(result.rows)
                }
    )
}

//
//
// AGE RESTRICTION

// STUDIO
// 
// 

const getStudios = (request, response) => {
    pool.query('SELECT * FROM  studios')
        .then(result => response.status(200).json(result.rows))
        .catch(err => response.status(500).json({error: err}))
}

const createStudio = (request, response) => {
    pool.query(`INSERT INTO studios (name)
                VALUES ('${request.body.name}')`)
        .then(result => response.status(200).json(result.rows))
        .catch(err => response.status(500).json({error: err}))
}

const updateStudio = (request, response) => {
    pool.query(`UPDATE studios 
                SET name = ${request.body.updated_studio_name}
                WHERE id = ${request.body.updated_studio_id}`, 
        (err, result) => {
            if (err) {
                throw err
            }

            response.status(200).json(result.rows)
        }
    )
}

const deleteStudio = (request, response) => {
    pool.query(`DELETE FROM studios 
                WHERE id = ${request.body.new_studio_id}`, 
        (err, result) => {
            if (err) {
                throw err
            }

            response.status(200).json(result.rows)
        }
    )
}

// GENRE
//
//

const getGenres = (request, response) => {
    pool.query('SELECT * FROM  genres')
        .then(result => response.status(200).json(result.rows))
        .catch(err => response.status(500).json({error: err}))
}

const createGenre = (request, response) => {
    pool.query(`INSERT INTO genres (name)
                VALUES ('${request.body.name}')`)
        .then(result => response.status(200).json(result.rows))
        .catch(err => response.status(500).json({error: err}))
}

const updateGenre = (request, response) => {
    pool.query(`UPDATE genres 
                SET name = ${request.body.name}
                WHERE id = ${request.body.id}`, 
                (err, result) => {
                    if (err) {
                        throw err
                    }

                    response.status(200).json(result.rows)
                }
    )
}

const deleteGenre = (request, response) => {
    pool.query(`DELETE FROM genres 
                WHERE id = ${request.body.id}`, 
                (err, result) => {
                    if (err) {
                        throw err
                    }

                    response.status(200).json(result.rows)
                }
    )
}

//
//
// GENRE

// GAME
//
//

const getGames = (request, response) => {
    pool.query(`SELECT 
                games.id AS id,
                title, 
                release_date, 
                description, 
                user_rating, 
                critic_rating,
                poster_url,
                studios.name AS studio_name, 
                publishers.name AS publisher_name,
                age_restrictions.name AS age_restriction_name
                FROM games 
                LEFT JOIN studios ON (games.studio_id = studios.id) 
                LEFT JOIN publishers ON (games.publisher_id = publishers.id)
                LEFT JOIN age_restrictions ON (games.age_restriction_id = age_restrictions.id)`
    )
        .then(result => response.status(200).json(result.rows))
        .catch(err => response.status(500).json({error: err}))
}


const getGameById = (request, response) => {
    console.log('gameid: ', request.params.gameid)
    pool.query(`SELECT 
                title, 
                release_date, 
                description, 
                user_rating, 
                critic_rating,
                poster_url,
                studios.id AS studio_id, 
                publishers.id AS publisher_id,
                age_restrictions.id AS age_restriction_id,
                JSON_AGG(DISTINCT genres.id) AS genre_ids,
                JSON_AGG(DISTINCT platforms.id) AS platform_ids
                FROM games 
                
                

                LEFT JOIN games_genres ON (games.id = games_genres.game_id)
                LEFT JOIN genres ON (genre_id = genres.id)

                LEFT JOIN games_platforms ON (games.id = games_platforms.game_id)
                LEFT JOIN platforms ON (platform_id = platforms.id)
        
                LEFT JOIN studios ON (games.studio_id = studios.id) 
                LEFT JOIN publishers ON (games.publisher_id = publishers.id)
                LEFT JOIN age_restrictions ON (games.age_restriction_id = age_restrictions.id)
                WHERE games.id = ${request.params.gameid}
                GROUP BY
                    title, 
                    release_date, 
                    description, 
                    user_rating, 
                    critic_rating,
                    poster_url,
                    studios.id,
                    publishers.id,
                    age_restrictions.id
                `
    )
        .then(result => response.status(200).json(result.rows))
        .catch(err => response.status(500).json({error: err}))
}

const createGame = (request, response) => {
    console.log('createGame invoked')
    pool.query(`INSERT INTO games (
                    title, 
                    release_date, 
                    description, 
                    publisher_id,
                    studio_id,
                    age_restriction_id,
                    critic_rating,
                    poster_url)
                VALUES (
                    '${request.body.title}',
                    '${request.body.release_date || 'infinity'}',
                    '${request.body.description || null}',
                    ${request.body.publisher_id || null},
                    ${request.body.studio_id || null},
                    ${request.body.age_restriction_id || null},
                    ${request.body.critic_rating || null},
                    '${request.file.path}'
                ) RETURNING *`)
        .then(result => {
            let genre_ids = JSON.parse(request.body.genre_ids)
            for (var i = 0; i < genre_ids.length; i++) {
                pool.query(`INSERT INTO games_genres (game_id, genre_id)
                            VALUES (${result.rows[0].id}, ${genre_ids[i]})`)
                    .then(() => console.log('done'))
                    .catch(err => {throw err})
            }

            let platform_ids = JSON.parse(request.body.platform_ids)
            for (var i = 0; i < platform_ids.length; i++) {
                pool.query(`INSERT INTO games_platforms (game_id, platform_id)
                            VALUES (${result.rows[0].id}, ${platform_ids[i]})`)
                    .then(() => console.log('done'))
                    .catch(err => {throw err})
            }
        })
        .then(() => response.status(200))
        .catch(err => {
            console.log('gotcha error: ', err)
            response.status(500).json({error: err.toString()})})
}

const updateGame = (request, response) => {
    pool.query(`UPDATE games 
                SET title = '${request.body.title}',
                    release_date = '${request.body.release_date || 'infinity'}',
                    description = '${request.body.description || null}',
                    publisher_id = ${request.body.publisher_id || null},
                    studio_id = ${request.body.studio_id || null},
                    age_restriction_id = ${request.body.age_restriction_id || null},
                    critic_rating = ${request.body.critic_rating || null},
                    poster_url = '${request.file? request.file.path: request.body.poster_url}'
                WHERE id = ${request.params.gameid}`) 
                .then(result => {
                    let gameId = request.params.gameid
                    pool.query(`DELETE FROM games_genres WHERE game_id=${gameId}`)
                    pool.query(`DELETE FROM games_platforms WHERE game_id=${gameId}`)

                    let genre_ids = JSON.parse(request.body.genre_ids)
                    for (var i = 0; i < genre_ids.length; i++) {
                        pool.query(`INSERT INTO games_genres (game_id, genre_id)
                                    VALUES (${gameId}, ${genre_ids[i]})`)
                            .then(() => console.log('done'))
                            .catch(err => {throw err})
                    }

                    let platform_ids = JSON.parse(request.body.platform_ids)
                    for (var i = 0; i < platform_ids.length; i++) {
                        pool.query(`INSERT INTO games_platforms (game_id, platform_id)
                                    VALUES (${gameId}, ${platform_ids[i]})`)
                            .then(() => console.log('done'))
                            .catch(err => {throw err})
                    }
                })
                .then(() => response.status(200))
                .catch(err => {
                    console.log('gotcha error: ', err)
                    response.status(500).json({error: err.toString()})
                })
}

const deleteGame = (request, response) => {
    pool.query(`DELETE FROM games 
                WHERE id = ${request.body.id}`, 
                (err, result) => {
                    if (err) {
                        throw err
                    }

                    response.status(200).json(result.rows)
                }
    )
}

//
//
// GAME

// PLATFORM
//
//

const getPlatforms = (request, response) => {
    pool.query('SELECT * FROM  platforms')
        .then(result => response.status(200).json(result.rows))
        .catch(err => response.status(500).json({error: err}))
}

const createPlatform = (request, response) => {
    pool.query(`INSERT INTO platforms (name)
                VALUES ('${request.body.name}')`)
        .then(result => response.status(200).json(result.rows))
        .catch(err => response.status(500).json({error: err}))
}

const updatePlatform = (request, response) => {
    pool.query(`UPDATE platforms 
                SET name = ${request.body.updated_platform_name}
                WHERE id = ${request.body.updated_platform_id}`, 
        (err, result) => {
            if (err) {
                throw err
            }

            response.status(200).json(result.rows)
        }
    )
}

const deletePlatform = (request, response) => {
    pool.query(`DELETE FROM platforms 
                WHERE id = ${request.body.new_platform_id}`, 
        (err, result) => {
            if (err) {
                throw err
            }

            response.status(200).json(result.rows)
        }
    )
}

//
//
// PLATFORM

// REVIEW
//
//

const getReviews = (request, response, next) => {
    pool.query('SELECT * FROM reviews')
        .then(result => response.status(200).json(result.rows))
        .catch(err => response.status(500).json({error: err}))

}
// const createReview
// const updateReview
// const deleteReview

//
//
// REVIEW

// ARTICLE
//
//

// const createArticle
// const updateArticle
// const deleteArticle
// const getArticleById

//
//
// ARTICLE

module.exports = {
    getReviews,

    getPublishers,
    createPublisher,
    updatePublisher,
    deletePublisher,

    getAgeRestrictions,
    createAgeRestriction,
    updateAgeRestriction,
    deleteAgeRestriction,

    getStudios,
    createStudio,
    updateStudio,
    deleteStudio,

    getGenres,
    createGenre,
    updateGenre,
    deleteGenre,

    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame,

    getPlatforms,
    createPlatform,
    updatePlatform,
    deletePlatform,

}