const User = require("../models/user");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res)=>{
    try{
        let { username, email, password } = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser, (err)=>{
            if(err) {
                return next(err);
            };
            req.flash("success","welcome to wandelust");
            res.redirect("/listings");
        });
    }    catch(err)  {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
    
};

module.exports.renderLoginFrom = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async (req,res)=>{
    req.flash("success", "welcome back to wanderlust");
    let redirectUrl = res.locals.redirect || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res, next)=>{
    req.logOut((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings" );
    })
};