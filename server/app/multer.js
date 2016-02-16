// load up the user model
var User = require('../app/models/user');

/*Configure the multer.*/
module.exports =function(multer,app) {

    var storage = multer.memoryStorage();
    var upload = multer({ storage: storage });

    app.post('/upload', upload.single('image'), function (req, res, next) {

        console.log(req.file);

        User.findOne({ 'email' :  req.user.email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return handleError(err);

            // check to see if theres already a user with that email
            if (user) {
                console.log('found user! '+ req.user.id);
                user.images.push({name:req.file.name, data: req.file});


                user.save(function(err){if (err) return handleError(err);});
            }



    });
})
}