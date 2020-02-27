export const apiPath = 'http://localhost:3001'

function dFetch(url, options){
    return fetch(apiPath + url, Object.assign({}, options, {headers: headers}))
        .then((response) => response)
        .catch((error) => {console.log('error',error); return 0})
}

export function getGames(){
    return dFetch('/games')
}

// export function createGame

// export function updateGame

// export function deleteGame
