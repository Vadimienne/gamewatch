export const apiPath = 'http://localhost:3001'

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

export function getGames(){
    return dFetch('/games')
}



export function createGame(json) {
    return dFetch('/games', {
        method: 'POST',
        body: JSON.stringify(json)
    },
    {
        'Content-Type': 'application/json'
    })
}

export function updateGame(json){
    return dFetch('/games', {
        method: 'PUT',
        body: JSON.stringify(json)
    })
}

// export function deleteGame
