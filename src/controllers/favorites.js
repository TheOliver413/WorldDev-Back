const{db} = require('../firebase')
const { Hotel, Location, ServicesHotel, ServicesRoom, Room, Event,Hotel_Event } = require('../db')
// async function getFirebaseInfo(){
//     const querySnapshot = await db.collection('users').get()

//     const contacts = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//     }))

//      return  contacts
// }
// async function createUser({email, name, rol}){
//     await db.collection('users').add({
//         email,
//         name, 
//         rol,
//         favorites: []
//     })

//     return 'User created!'
// }
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
     
    return favoritesRooms
}

async function addFavorites({id, favorites}){
    let userDat = await db.collection('users').doc(id).get()
    const info = userDat.data()

    await db.collection('users').doc(id).update({
       ...info,
        favorites: [...info.favorites, ...favorites]
    })
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
    deleteFavorites
}




