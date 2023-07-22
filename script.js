const express=require("express")
const bodyParser=require('body-parser')
const https=require("https")
//The https module is a built-in Node.js module that provides the ability to make HTTPS requests. It allows Node.js applications to communicate with other servers over a secure channel using the HTTPS protocol.

const app=express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
    })

app.post("/",(req,res)=>{
    const query=req.body.cityName
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+
    "&appid=e9aa34364520f94d8015f4e5127f79e2&units=metric"

    https.get(url,(response)=>{
         console.log(response.statusCode)
         response.on("data",function(data){
            const weatherData=JSON.parse(data)
            const temp= weatherData.main.temp
            const icon=weatherData.weather[0].icon
            const imageUrl=" https://openweathermap.org/img/wn/"+icon+"@2x.png"
           res.write("<h1>The temp in "+query+" is "+ temp +"</h1>")
           res.write("<img src="+imageUrl+">")
            res.write("<p> For more stay connected</p>")
            res.send()
        })

})
 })

 //The https.get() method is a built-in function of the Node.js HTTPS module used to make HTTP GET requests to a specified URL using HTTPS protocol.
    // When called, https.get() sends a GET request to the specified URL and expects a response in the form of a stream. It takes two parameters: the URL to send the GET request to, and a callback function that will be invoked when the response is received.
app.listen(3000,()=>
{
console.log("App running")
})