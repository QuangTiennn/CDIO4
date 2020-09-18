const express = require("express");
const passport = require("passport");
const router = express.Router();

module.exports.indexLoginFb = (req,res)=>{
    let user = req.body.user;
    console.log(user);
    res.render("../views/layoutauth/login.pug",{
        user
    });
}

module.exports.login = (req,res) => {
    //return to page login 
}

module.exports.account = (req,res) => {
    let user = req.body.user;
    res.render("account",{
        user
    });
}

module.exports.authFb = (req, res) => {
    res.render("../views/layoutauth/login.pug")
    passport.authenticate("facebook", {
        scope : 'email'
    });
}

module.exports.authFbCallBack = (req, res) => {
    passport.authenticate('facebook',{
        successRedirect : '/',
        failureRedirect : '/login',
    });
    res.redirect('/');
}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect("/");
}

