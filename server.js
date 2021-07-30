// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", function (req, res) {
  const now = new Date();

  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

app.get("/api/:input", function (req, res) {
  let date = req.params.input;
  let resObj = {};

  if( date.includes('-') || date.includes(" ") || date.includes("/")){  
    resObj['unix'] = new Date(date).getTime();
    resObj['utc'] = new Date(date).toUTCString();
  }else{
    unix = parseInt(date)

    resObj['unix'] = new Date(unix).getTime();
    resObj['utc'] = new Date(unix).toUTCString();
  }

  if (!resObj['unix'] || !resObj['utc']){
    resObj = {error: 'Invalid Date'};
  }

  res.json(resObj);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
