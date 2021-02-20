$(document).ready(function(){
    $("#submit").click(function(){
        var formData = {
            email:document.getElementById("email").value,
            username:document.getElementById("username").value,
            password:document.getElementById("password").value,
            gender:document.getElementById("gender").value,
            type:document.getElementById("type").value
        }
        console.log(formData);
        $.post("/signup",formData,(data,status)=>{
            console.log(`data is: ${data} status is:${status}`);
        });
    });
});
