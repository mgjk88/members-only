const passport = require('passport');

const verifyCredentials = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureMessage: true
})

function getForm(req, res){
    try {
        res.status(200).render('login');        
    } catch (error) {
        console.error(error);
        res.status(500)
    }
}

module.exports = {
    verifyCredentials,
    getForm
}