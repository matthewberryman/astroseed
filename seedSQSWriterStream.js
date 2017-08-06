const AWS=require('aws-sdk');
const stream = require('stream');

const seedSQSWriterStream = class seedSQSWriterStream extends stream.Writable {

  send(callback) {

    while (this.mybuffer.length >= 4) {
      var seed = String(this.mybuffer.slice(0,4).readInt32LE());

      var params = {
        DelaySeconds: 0,
        MessageAttributes: {
          "seed": {
            DataType: "Number",
            StringValue: seed,
          }
        },
        MessageBody: "Random seed " + seed,
        MessageGroupId: "1",
        QueueUrl: process.env.SQS_QUEUE_URL
      };
      console.log(params);
      this.sqs.sendMessage(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.MessageId);
        }
      });

      this.mybuffer = this.mybuffer.slice(4);
    }

    callback(null);
  }

  constructor(queue_url) {
    super();
    this.mybuffer = new Buffer.from('');
    this.sqs = new AWS.SQS();
    this.queue_url = queue_url;

  }

  _write(chunk, encoding, callback) {
    this.mybuffer = Buffer.concat([this.mybuffer,chunk]);
    this.send(callback);

  }
}



module.exports = seedSQSWriterStream;
