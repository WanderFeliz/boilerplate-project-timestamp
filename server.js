// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  let {date} = req.params;
  let dateVal;
  let error = null;
  console.log(date)
  if (date == null){
    error = "Invalid Date";
  }
  else if (!date.trim()) {
    dateVal = Date.now();
  } else {
    dateVal = new Date(date);
  }

  let verifyDate = Date.parse(date)
  if(isNaN(verifyDate) && isNaN(dateVal.setTime(date))){
    error = "Invalid Date";
  }
  
  let utcDate = new Date();
  let unixDate = "";
  unixDate = Date.parse(date)
  if (isNaN(unixDate)){
    unixDate = Date.parse(utcDate);
  }else{
    utcDate.setTime(dateVal)
  }
  if (error) {
    res.json({error: error})
  }else{
    res.json({unix: unixDate, utc: utcDate.toUTCString()});
  }
});



// listen for requests :)
// process.env.PORT = 3000;
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
