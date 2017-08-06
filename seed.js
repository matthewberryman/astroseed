const request = require('request'),
  rp = require('request-promise'),
  crypto = require('crypto'),
  seedSQSWriterStream = require('./seedSQSWriterStream');

var hash = crypto.createHash('sha256'),
  seedSQSWriter = new seedSQSWriterStream(process.env.SQS_QUEUE_URL);

var hash_url = function(url) {
  request
  .get(url)
  .on('error', function(err) {
    console.log(err);
  })
  .pipe(hash).pipe(seedSQSWriter);
};

module.exports.handler = (event, context, callback) => {
  var options = {
      uri: 'https://api.nasa.gov/EPIC/api/v1.0/images.php',
      qs: {
          api_key: process.env.API_KEY || 'DEMO_KEY' // -> uri + '?API_KEY=xxxxx%20xxxxx'
      },
      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function (response) {
        var url = 'https://epic.gsfc.nasa.gov/epic-archive/jpg/'+ response[0].image + '.jpg';
        hash_url(url);
    })
    .catch(function (err) {
      console.log(err);
    });

}
