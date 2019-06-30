const express = require('express'),
      mongoose = require('mongoose'),
      router = express.Router();

var recordsCollection = mongoose.connection.collection('records');

router.get('/', (req, res) => {
  var project1 = { "year" : { "$year" : "$ts"}, "val" : "$val"};
  var group = {"_id" : { "year" : "$year"}, "count" : { "$avg" : "$val"}};
  var project2 = {"_id" : 0, "year" : "$_id.year", "count" : 1.0};
  var sort = {"year" : 1};
  recordsCollection.aggregate([
    {"$project" : project1},
    {"$group" : group},
    {"$project" : project2},
    {"$sort" : sort} 
  ]).toArray((err, results) => {
    if (err){
        console.log("Error getting the result");
        return res.send([]);
    }

    return res.send(results);
  })
})

module.exports = router;
