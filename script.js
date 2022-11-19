const http = require('http');
const fs =require("fs");
var requests =require ("requests");

const replaceval=(tempval,orgval)=>{
    let temprature = tempval.replace("{%temp%}",orgval.main.temp);
    // temprature = tempval.replace("{%Humidity%}",orgval.main.humidity);
    // temprature = tempval.replace("{%temp%}",orgval.main.temp);
   
    return temprature;
};

const Homefile =fs.readFileSync("home.html","utf-8");
// console.log(Homefile)
const server = http.createServer((req,res)=>{
    if(req.url=="/"){
        requests(
            "https://api.openweathermap.org/data/2.5/weather?q=patna&appid=2656e5bf78dfb9d0ca8cb25b19fff94c"
        )
        .on("data", (chunk)=>{
            const objdata=JSON.parse(chunk);
            const arrData=[objdata]
            // console.log(arrData[0].main.temp);
            // console.log(val.main);
            const realtimedata= arrData.map((val)=>replaceval(Homefile, val)).join("");
            res.write(realtimedata);
            // console.log(realtimedata);
            
        
        })
        .on("end", (err)=>{
            if(err)  return console.log("connection closed due toerrors",err)
            res.end();
        });
    }
    
});

server.listen (8000,"127.0.0.1");
