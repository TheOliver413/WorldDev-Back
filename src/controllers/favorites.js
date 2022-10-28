const{db} = require('../firebase')
const { Hotel, Location, ServicesHotel, ServicesRoom, Room, Event,Hotel_Event } = require('../db')

async function getFavoritesIdsByUserId(id){
    let userFinded = await db.collection('users').doc(id).get()
    userFavorites = ({
        favorites:userFinded.data().favorites
    }).favorites

    return userFavorites
}

async function getFavoritesByUserId(id){
    let favoritesRooms = []
    let userFinded = await db.collection('users').doc(id).get()
    userFavorites = ({
        favorites:userFinded.data().favorites
    }).favorites

    for (let i = 0; i < userFavorites.length; i++) {
        let roomFinded = await Room.findByPk(userFavorites[i])
        favoritesRooms = [...favoritesRooms, roomFinded]
    }
    if (favoritesRooms.length) return favoritesRooms
    else throw 'No rooms added to favorites'
}

async function addFavorites({id, favorites}){
    let userDat = await db.collection('users').doc(id).get()
    const info = userDat.data()

    if(!info.favorites.includes(favorites[0])){
      await db.collection('users').doc(id).update({
       ...info,
        favorites: [...info.favorites, ...favorites]
    })  
    }else{
        throw new Error('Favorite includes in user favorites', { statusCode: 404 })
    }
    return 'Favorites added'
}


async function deleteFavorites({id, favorite}){
    let userDat = await db.collection('users').doc(id).get()
    const info = userDat.data()
    const infoFiltered = info.favorites.filter(f => f !== favorite)
    console.log(infoFiltered)
    await db.collection('users').doc(id).update({
       ...info,
        favorites: infoFiltered
    })
    return 'Favorite deleted!'
}

module.exports = {
    getFavoritesByUserId,
    addFavorites,
    getFavoritesIdsByUserId,
    deleteFavorites
}




