const db = require('../db/queries');

async function postMessage(req, res){
    try {
        await db.addMessage(req.user.username, req.body.message);
        res.status(200).redirect('/');        
    } catch (error) {
        console.error(error);
        res.status(500)
    }
}

function getForm(req, res){
    try {
        res.status(200).render('newMessage');        
    } catch (error) {
        console.error(error)
        res.status(500)
    }
}

module.exports = {
    getForm,
    postMessage
}