var express = require('express');
app = express();

app.get('/', function (req, res) {
  res.send('You should hire Akshay, I recommend him as a Wizard!   - Prof. Dumbledore');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

