const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function(mongoUrl) {
  mongoose.Promise = global.Promise;

  //mongoose connection startup
  mongoose.connect(mongoUrl, {
    useMongoClient: true
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('We are connected to: ' + mongoUrl);
    }
  });

  var plumberSchema = new Schema({
    fullName: String,
    bookings: [{
      day: String,
      slot: String,
      client: [{
        name: String,
        contact: Number
      }]
    }]
  })

  const plumbers = mongoose.model('plumbers', plumberSchema);

  return {
    plumbers
  }

} //END
