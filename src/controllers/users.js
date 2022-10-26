const{db} = require('../firebase')

async function getFirebaseInfo(){
    const querySnapshot = await db.collection('users').get()

    const contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

     return  contacts
}
// async function createUser({email, name, rol}){
//     await db.collection('users').add({
//         email,
//         name, 
//         rol,
//         favorites: []
//     })

//     return 'User created!'
// }
async function getUserById(id){
    let userFinded = await db.collection('users').doc(id).get()
    userFinded = {
        id: userFinded.id,
        ...userFinded.data()
    }
    return userFinded
}

async function updateUser(body){
    const id = body.id
    delete body.id

    await db.collection('users').doc(id).update(body)

    return 'User modify!'
}
async function deleteUser(id){
    await db.collection('users').doc(id).delete()
    return 'User deleted!'
}
module.exports = {
    getFirebaseInfo,
    // createUser,
    getUserById,
    updateUser,
    deleteUser
}
