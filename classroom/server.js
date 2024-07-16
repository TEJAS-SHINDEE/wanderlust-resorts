const express = require("express");
const app = express();
const users = require("./routes/user.js");           //require route from 
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
// app.use(cookieParser());

// app.get("/getcookies", (req,res)=>{
//     res.cookie("greet","hello");
//     res.cookie("great","meet");
//     res.cookie("hi",90);
//     res.send("sent you some cookie");
// });
// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("hi, I am Root");
// });

// app.use("/users",users);
// app.use("/posts",posts);


app.set("view engine","ejs");
app.set("views" , path.join(__dirname, "views"));

//m/w added secret
app.use(
    session({secret:"mysupersecreteString", 
    resave:false, 
    saveUninitialized : true})
);
app.use(flash());

app.get("/register",(req,res) =>    {
    let {name = "unknown"} = req.query;
    req.session.name = name;
    // res.send(name);
    if(name === "unknown")  {
        req.flash("error","user is not registered");
    }
    else    {
        req.flash("success","user registered successfully");

    }
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    // res.send(`hello ${req.session.name}`);
    res.locals.
    res.render("page.ejs",{name : req.session.name, msg : req.flash("success")});
});

//getcount
// app.get("/setCount",(req,res)=> {

//     if(req.session.count)   {
//         req.session.count++;
//     }
//     else    {
//         req.session.count = 1;
//     }

//     res.send(`you sent req ${req.session.count} times`);
// });
app.listen(3000, ()=>{
    console.log("server listing to 3000");
});