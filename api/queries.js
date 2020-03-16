export const apiPath = process.env.NODE_ENV == 'production' ? 
    'http://95.73.203.246:81': 
    'http://localhost:3001'

let defaultHeaders = {}

function dFetch(url, options, myHeaders = {}){
    return fetch(apiPath + url, 
        Object.assign(
            {mode: 'cors'}, 
            options, 
            {
                headers: Object.assign({}, defaultHeaders, myHeaders)
            }
        )
    )
        .then((response) => response)
        .catch((error) => {console.log('error',error); return 0})
}


// GAMES

export function getGames(){
    return dFetch('/games')
}

export function createGame(json) {
    return dFetch('/games', {
        method: 'POST',
        body: json
    })
}

export function updateGame(json){
    return dFetch('/games', {
        method: 'PUT',
        body: JSON.stringify(json)
    })
}


// GENRES

export function getGenres(){
    return dFetch('/genres')
}

export function createGenre(json){
    return dFetch('/genres', {
        method: 'POST',
        body: JSON.stringify(json)
    },
    {
        'Content-Type': 'application/json'
    })
}


// STUDIOS

export function getStudios(){
    return dFetch('/studios')
}

export function createStudio(json){
    return dFetch('/studios', {
        method: 'POST',
        body: JSON.stringify(json)
    },
    {
        'Content-Type': 'application/json'
    })
}


// PUBLISHERS

export function getPublishers(){
    return dFetch('/publishers')
}

export function createPublisher(json){
    return dFetch('/publishers', {
        method: 'POST',
        body: JSON.stringify(json)
    },
    {
        'Content-Type': 'application/json'
    })
}


// AGE RESTRICTIONS

export function getAgeRestrictions(){
    return dFetch('/ageRestrictions')
}


// PLATFORMS

export function getPlatforms(){
    return dFetch('/platforms')
}

export function createPlatform(json){
    return dFetch('/platforms', {
        method: 'POST',
        body: JSON.stringify(json)
    },
    {
        'Content-Type': 'application/json'
    })
}

// export function deleteGame
