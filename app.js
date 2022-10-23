const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const ip = req.body.IPaddress;
  const options = {
    path: '/' + ip + '/json/',
    host: 'ipapi.co',
    port: 443,
    headers: { 'User-Agent': 'nodejs-ipapi-v1.02' }
  };
  https.get(options, resp => {
      var body = ''
      resp.on('data', function(data){
          body += data;
      });

      resp.on('end', function(){
          var loc = JSON.parse(body);
          console.log(loc);
      });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
