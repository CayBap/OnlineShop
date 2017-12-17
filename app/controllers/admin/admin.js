const express = require('express');
const router = express.Router();
var User = require('../../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.use('/user',require(__dirname+'/user'));
router.use('/cate',require(__dirname+'/cate'));

router.get('/',checkAdmin,(req,res)=>{
    res.render('admin/dashbroad');
});
router.get('/login',(req,res)=>{
    res.render('admin/login');
})
.post('/login', 
  passport.authenticate('local', { failureRedirect: '/admin/login' }),
  function(req, res) {
    res.redirect('/admin');
  });
// router.post('/login',
//   passport.authenticate('local', { successRedirect: '/admin',
//                                    failureRedirect: '/admin/login',
//                                    failureFlash: true })
// );
passport.serializeUser(function(email, done) {
    done(null, email.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, email) {
      done(err, email);
    });
  });
  
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(username, password, done) {
    // console.log(username);
      User.findOne({email: username}, function(err, username){
          if(err) throw err;
          if(username){
            //   console.log(password);
            // console.log(bcrypt.hashSync(password));
            bcrypt.compare(password, username.password, function(err, user) {
                if(err) throw err;
                if(user){
                     return done(null, username,{message:""});
                }else{
                   return done(null, false, { message: 'Tài Khoảng Không Đúng' });
                }
            });
          }else{
             return done(null, false, { message: 'Tài Khoảng Không Đúng' });
          }
      });
  }

));


router.get('/logout',checkAdmin, function (req, res) {
    req.logout();
    res.redirect('/admin/login');
});


function checkAdmin(req, res, next){
   
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/admin/login');
    }
}
module.exports = router;