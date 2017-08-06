const request = require('request-promise')
  aws = require('aws-sdk');

module.exports.handler = (event, context, callback) => {
  var options = {
      uri: 'https://api.nasa.gov/EPIC/api/v1.0/images.php',
      qs: {
          api_key: 'DEMO_KEY' // -> uri + '?access_token=xxxxx%20xxxxx'
      },
      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
  };

  request(options)
      .then(function (response) {
          console.log(response);
      })
      .catch(function (err) {
          console.log(err);
      });
}
