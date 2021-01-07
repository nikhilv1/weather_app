const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

	 res.sendFile(__dirname+"/index.html");//for post

    //const url="https://api.openweathermap.org/data/2.5/weather?q=Ranchi&appid=07e4ea6013ab8517219e0462c436d2c3&units=metric";

	// https.get(url, function(response){
	// 	console.log(response.statusCode);

	// 	response.on("data", function(data){
	// 		const weatherData = JSON.parse(data);
	// 		const temp = weatherData.main.temp;
	// 		const desc = weatherData.weather[0].description;
	// 		const icon = weatherData.weather[0].icon;

	// 		console.log(temp);
	// 		console.log(desc);

	// 		res.write("<h1>The Temprature in Ranchi is "+temp+ " degrees celcius</h1>");
	// 		res.write("<h3>The weather in Ranchi is currently "+desc+ " </h3>");
 //            res.write("<img src = 'http://openweathermap.org/img/wn/"+icon+"@2x.png'>");
			
	// 		res.send();
	// 	});

	// });
	
	// res.send("server is up and running");
});


app.post("/",(req,res) => {
    console.log(req.body);
    const cityName = req.body.cityName;

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=07e4ea6013ab8517219e0462c436d2c3";
    https.get(url, (response) => {
        response.on("data", (data) => {
            const parsedData = JSON.parse(data);
            const temp = parsedData.main.temp;
            const weatherDes = parsedData.weather[0].description;
            const icon = parsedData.weather[0].icon;
            res.write("<h1>Weather in "+cityName+" is "+temp+" degree celsius</h1>")
            res.write("<p>Description: "+weatherDes+"</p>");
            res.write("<img src = 'http://openweathermap.org/img/wn/"+icon+"@2x.png'>");
            res.send();
        });
    });

});

app.listen(3000, function(){
	console.log("server is running on port 3000. ");
});