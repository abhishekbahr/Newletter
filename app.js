const express = require("express");
const request = require("request");
const bodyparser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",(req,res) => {
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",(req,res)=>{
    var First_Name = req.body.fName;
    var Last_Name= req.body.lName; 
    var Email = req.body.email;
    
    const data = {
        members : [
            {
                email_address : Email,
                status : "subscribed",
                merge_fields : {
                    FNAME: First_Name,
                    SNAME: Last_Name,
                }
            }
        ]     
    };

    const jsondata=JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/AudienceId of your account";
    const options = {
        method: "POST",
        auth: "Abhishek:Api key"
    }

    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

request.write(jsondata);
request.end();
})

app.post("/failure",(req,res) => {
    res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
    console.log("server started running ");
})

