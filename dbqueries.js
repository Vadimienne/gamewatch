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
                VALUES ('${request.body.name}')`, (err, result) => {
        if (err) {
            throw err
        }

        response.status(200).json(result.rows)
    })
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

// DEV STUDIO
// 
// 

const getStudios = (request, response) => {
    pool.query('SELECT * FROM  studios')
        .then(result => response.status(200).json(result.rows))
        .catch(err => response.status(500).json({error: err}))
}

const createStudio = (request, response) => {
    pool.query(`INSERT INTO studios (name)
                VALUES ('${request.body.new_studio_name}')`, (err, result) => {
        if (err) {
            throw err
        }

        response.status(200).json(result.rows)
    })
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
                VALUES ('${request.body.name}')`, 
                (err, result) => {
                    if (err) {
                        throw err
                    }

                    response.status(200).json(result.rows)
    })
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
                title, 
                release_date, 
                description, 
                user_rating, 
                critic_rating,
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
    // pool.query('SELECT * FROM  games', (err, result) => {
    //     if (err) {
    //         throw err
    //     }
    //     console.log(result.rows)

    //     response.status(200).json(result.rows)
    // })
}

const createGame = (request, response) => {
    pool.query(`INSERT INTO games (
                    title, 
                    release_date, 
                    description, 
                    publisher_id,
                    studio_id,
                    age_restriction_id,
                    critic_rating)
                VALUES (
                    '${request.body.title}',
                    '${request.body.release_date}',
                    '${request.body.description}',
                    ${request.body.publisher_id},
                    ${request.body.studio_id},
                    ${request.body.age_restriction_id},
                    ${request.body.critic_rating}
                )`, 
                (err, result) => {
                    if (err) {
                        throw err
                    }
                    var currentGenreId
                    for (currentGenreId of request.body.genres) {
                        pool.query(`INSERT INTO games_genres (game_id, genre_id)
                                    VALUES (${request.body.id}, ${currentGenreId}`,
                                    (genreError, genreResult) => {
                                        if (genreError) {
                                            throw genreError
                                        }
                                    })
                    }

                    var currentPlatformId
                    for (currentPlatformId of request.body.platforms) {
                        pool.query(`INSERT INTO games_platforms (game_id, platform_id)
                                    VALUES (${request.body.id}, ${currentPlatformId}`,
                                    (genreError, genreResult) => {
                                        if (genreError) {
                                            throw genreError
                                        }
                                    })
                    }

                    

                    response.status(200).json(result.rows)
    })
}

const updateGame = (request, response) => {
    pool.query(`UPDATE games 
                SET title = ${request.body.title},
                    release_date = '${request.body.release_date}',
                    description = '${request.body.description}',
                    publisher_id = ${request.body.publisher_id},
                    studio_id = ${request.body.studio_id},
                    age_restriction_id = ${request.body.age_restriction_id},
                    critic_rating = ${request.body.critic_rating}
                WHERE id = ${request.body.id}`, 
                (err, result) => {
                    if (err) {
                        throw err
                    }

                    var currentGenreId
                    for (currentGenreId of request.body.genres) {
                        pool.query(`INSERT INTO games_genres (game_id, genre_id)
                                    VALUES (${request.body.id}, ${currentGenreId}`,
                                    (genreError, genreResult) => {
                                        if (genreError) {
                                            throw genreError
                                        }
                                    })
                    }

                    var currentPlatformId
                    for (currentPlatformId of request.body.platforms) {
                        pool.query(`INSERT INTO games_platforms (game_id, platform_id)
                                    VALUES (${request.body.id}, ${currentPlatformId}`,
                                    (genreError, genreResult) => {
                                        if (genreError) {
                                            throw genreError
                                        }
                                    })
                    }

                    response.status(200).json(result.rows)
                }
    )
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
                VALUES ('${request.body.new_platform_name}')`, (err, result) => {
        if (err) {
            throw err
        }

        response.status(200).json(result.rows)
    })
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
    createGame,
    updateGame,
    deleteGame,

    getPlatforms,
    createPlatform,
    updatePlatform,
    deletePlatform,

}