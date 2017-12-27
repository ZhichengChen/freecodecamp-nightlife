
/*
 * GET home page.
 */
var request = require('request');

exports.index = function(req, res){
  res.render('index', { title: '晚上去哪？' });
};

exports.search = function(req, res) {
    var keywords = req.body.keywords;
    if (!keywords) {
      keywords = req.session.keywords;
    }
    req.session.keywords = keywords;
    var options = {
      url: 'https://api.yelp.com/v3/businesses/search?categories=bars&location='+keywords,
      headers: {
        'Authorization': 'Bearer rDVk_huYr2bW0IsWCrH5McRlIfX7_NfhMizEf4HIw8Wf5RxCWRMtPQUGzXBJmx1CU8MF0ELxgFZoXys6EIPKmdiMPpvDOGIRSZhzdW60DRX1S3cknQs6vK8PcQBCWnYx'
      }
    };
    
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body).businesses;
        for (var i=0;i<info.length;i++) {
          for (var key in records) {
            if (info[i].id == key) {
              info[i].users = records[key];
            }
          }
        }
        res.render('index', {title: '晚上去哪？', result: info});
      } else {
        res.json(error)
      }
    }
    
    request(options, callback);
};
var records = {};
exports.go = function(req, res, next) {
  var id = req.params.id;
  var username = req.user.username;
  if (records.hasOwnProperty(id)) {
    var find = false;
    for (var i=0;i<records[id].length;i++) {
      if (records[id] == username) {
        records[id].splice(i,1);
        find = true;
        break;
      }
    }
    if (!find) {
      records[id].push(username);  
    }
  } else {
    records[id] = [username];
  }
  console.log(records);
  next();
};