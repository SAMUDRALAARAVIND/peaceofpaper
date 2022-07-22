const express = require("express");
const app = express();
const bodyParser = require('body-parser');
// const orders = require("routes/orders");
const orders = require("./routes/orders");
const connection = require("./connection");
connection.connect();
console.log("connected successfully");
const customers = require("./routes/customers");

const products = require("./routes/products");

const leads  = require("./routes/leads");
const {validator} = require("./validator");
const {emailSender} = require("./validator.js");

app.use("/leads",leads);

app.use("/products",products);

app.use("/customers",customers);

app.use("/orders",orders);
app.use(express.static('public'));
var port = process.env.PORT  || 8080;
app.set("views","views");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

app.get("/",function(req,resp){
    resp.render("login");
});
app.get("/welcome",function(req,resp){
    resp.render("welcome");
})
app.get("/success",(req,resp)=>{
    var email =  req.body;
    
})


app.get("/signup",(req,resp)=>{
    resp.render("signup");
});

app.post("/signup",(req,resp)=>{
    var data = req.body;
    var formValidator = new validator(data.email,data.username,data.password);
    var errorArray = formValidator.validateForm();
    if(errorArray.length>0){
        resp.send(JSON.stringify(errorArray));
    }
    else{
        var tempUserQuery = `INSERT INTO tempuser(email,username,password,gender,type) VALUES('${data.email}','${data.username}','${data.password}','${data.gender}','${data.type}');`;
        connection.query(tesmpUserQuery);
        var testing = new emailSender(data.email);
        testing.createHtmlElement();
        var query = testing.insertPasscode();
        connection.query(query,(err,result)=>{
            if(err) console.log(err);
            resp.send(`/emailvalidation?email='${data.email}'`);
        });
        
    }
});
app.get("/emailvalidation",(req,resp)=>{
    var email = req.query.email;
    resp.render("emailvalidation",{x:JSON.stringify(email)});
});
app.post("/emailvalidation",(req,resp)=>{
    var data = req.body;
    var query = `SELECT * FROM passcode WHERE email='${data.email} AND passcode='${data.passcode}';`;
    connection.query(query,(err,result)=>{
        if(err) {
            console.log("Error occured");
            resp.send("error");
        }
        else if(resultlength>0){
          connection.query(`INSERT INTO`)
          resp.send("/home");
        }
        else
          resp.send("Invalid");
    });
})
app.post("/login",(req,resp)=>{
    console.log("Requested server");
    var data = req.body;
    console.log(JSON.stringify(data));
    var query = `SELECT * FROM customers WHERE username='${data.username}' and password='${data.password}';`;
    var result = connection.query(query,(err,result)=>{
        if(err) resp.send(err);
        else if (result.length>=1){
            resp.send("/welcome");
        }
        else{
            resp.send("false");
        }
    });
});


function test() {
    console.log("Hello test") ;
}

