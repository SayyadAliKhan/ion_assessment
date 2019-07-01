const express = require('express'),
      mongoose = require('mongoose'),
      fs = require('fs'),
      JSONStream = require('JSONStream'),
      es = require('event-stream'),
      router = express.Router(),
      multer = require('multer');

var arrayOfRecords = [];
var stream;
var recordsCollection = mongoose.connection.collection('records');
recordsCollection.createIndex({ts : 1}, {sparse: true});

//This route uploads the file, stores it in the upload folder and start processing it
router.post("/upload", (req, res) => {
  var DIR = '../uploads/';
  var upload = multer({dest: DIR}).single('file');
  var path = '';
     upload(req, res, function (err) {
        if (err) {
          console.log(err);
          return res.status(422).send("File Cannot be uploaded")
        }
        path = req.file.path;
        res.send("File uploaded Successfully");
        console.log("path", path);
        var getStream = (path) => {
                stream = fs.createReadStream(path, {encoding: 'utf8'}),
                parser = JSONStream.parse('*');
                return stream.pipe(parser);
        };

         getStream(path)
         .on('data', async (record) => {
           record.ts = new Date(record.ts);
           arrayOfRecords.push(record);
           if (arrayOfRecords.length === 1000) {
             stream.pause();
             try{
               await recordsCollection.insertMany(arrayOfRecords).catch(err => {
                 if(err){
                   console.log(err);
                 }
               });
             }catch(err){
               console.log(err);
             }
             arrayOfRecords = [];
             stream.resume();
           }
         }).on('end', async () => {// left over data
          try{
            await recordsCollection.insertMany(arrayOfRecords).catch(err => {
              if(err){
                console.log(err);
              }
            });
          }catch(err){
            console.log(err);
          }
          console.log("Read completely");
        });
  });

})

module.exports = router;
