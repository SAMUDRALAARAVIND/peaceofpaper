const nodemailer = require("nodemailer");

class validator{
    constructor(e,u,p){
        this.email = e;
        this.username = u;
        this.password = p;
    }
    //return 0 if validation is success else return 1
    validateEmail(){
        var regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(this.email.match(regEx) && this.email.length!=0){
            return 0;
        }else{
            return 1;
        }
    }
     validatePassword(){
        var regEx = /^[a-z0-9_-#$&^*+]/i;
        var result = this.password.match(regEx);
        if(result.length ==0 && this.password.length<=16 && this.password.length>=6){
            return 0;
        }
        else{
            return 1;
        }
    }
     validateUsername(){
        var regExp = /^[a-zA-Z0-9#@$^&*+_-]/i;
        var result = this.username.match(regExp);
        if(result.length==0 && this.username.length>=3 && this.username.length<=50){
            return 0;
        }
        else{
            return 1;
        }
    }
     validateForm(){
        var errorArray = [];
        if(this.validateEmail()==1)
           errorArray.push("e");
        if(this.validatePassword==1)
           errorArray.push("p");
        if(this.validateUsername()==1)
           errorArray.push("u");
       return errorArray;
    }
}


class emailSender{
    constructor(e){
        this.userEmail = e;
        this.code="";
    }
     createHtmlElement(){
        this.code = Math.floor(Math.random()*1000000+1);
        var textHtml = `<h1>Thank you for Registrations!</h1>
        <p>The six digit passcode for your account validation is: <b>${this.code}</b></p>`;
        var transmitter = {
            service:"Gmail",
            auth:{
                user:"anonymousxyz1708@gmail.com",
                pass:"INDIAN@123"
            }
        }
        var receiver = {
            from:"samudralaaravind1708@gmail.com",
            to:this.userEmail,
            subject:'Email verification from SV academy',
            html:textHtml
        }
        var result ="mowa";
        var transporter = nodemailer.createTransport(transmitter);
        transporter.sendMail(receiver,(err,info)=>{
            if(err) console.log(`Error occured ${err}`);
            else console.log("successfully sent mail");
        });

    }
     insertPasscode(){
        return `INSERT INTO passcode(email,code) VALUES('${this.userEmail}','${this.code}');`;

    }

}












module.exports = {validator,emailSender};