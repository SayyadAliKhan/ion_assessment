const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      file = require('./router/file'),
      graph = require('./router/graph');

mongoose.connect("mongodb://localhost:27017/thermometer", { useNewUrlParser: true }, (err, db) => {
  console.log("MongoDB connected");
});

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use('/file', file);
app.use('/graph', graph);

app.listen(3000, (err) =>{
  console.log("Listening on port 3000");
});
