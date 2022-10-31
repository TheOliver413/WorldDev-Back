const{db} = require('../firebase')

async function getUsers(){
    const querySnapshot = await db.collection('users').get()

    let contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    contacts = contacts.filter(e => e.rol === 'user')
     return  contacts
}

async function getAdmins(){
    const querySnapshot = await db.collection('users').get()

    let contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    contacts = contacts.filter(e => e.rol === 'admin')
     return  contacts
}

async function createUser(body){
    const id = body.id
    delete body.id

    await db.collection('users').doc(id).set(body, { merge: true }) 

    return 'User created!'
}

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
async function userBlock(body){
    const id = body.id
    delete body.id
    let userDat = await db.collection('users').doc(id).get()
    const info = userDat.data()

    if(info.hasOwnProperty('blocked')){
        if(info.blocked === true){
            await db.collection('users').doc(id).update({
                ...info,
                 blocked: false
             })
        }else{
            await db.collection('users').doc(id).update({
                ...info,
                 blocked: true
             })
        }
    }else{
         await db.collection('users').doc(id).update({ blocked: body.blocked})
    }
   
    return 'User blocked!'
}

async function deleteUser(id){
    await db.collection('users').doc(id).delete()
    return 'User deleted!'
}
module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAdmins,
    userBlock
}
