
module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return next()
        }
        res.send('Unauthorized')
    },
    forwardAuthenticated: function(req, res, next){
        if(!req.isAuthenticated()){
            return next()
        }
        res.send('Will get back to this')
    }
}