module.exports = function(models) {

  //initially display all plumbers

  const home = function(req, res, next) {
    models.plumbers.find({}, function(err, results) {
      console.log(arguments);
      if (err) {
        return next(err)
      }
      if (results) {
        res.json(results)
      }
    })
  }

  //show screen for booking a plumber
  const plumber = function(req, res, next) {
    models.plumbers.findOne({
      fullName: req.params.fullName
    }, function(err, results) {
      if (err) {
        return next(err);
      }
      if (results) {
        res.redirect('/api/plumbers/:id');
      }
    })
  }

  //see plumbers schedule and make booking for certain slot



  // //log plumber in otherwise register as a new plumber
  const index = function(req, res, next) {
    var id = req.params.id;
    var fullName = req.body.fullName;

    models.plumbers.findOne({
fullName: req.body.fullName
    }, function(err, plumber) {
      if (err) {
        return next(err);
      }
      if (!plumber) {
        if(req.body.fullName !== null){
          models.plumbers.create({
            fullName: req.body.fullName
          }, function(err, newPlumber) {
            if (err) {
              return next(err);
            }
            if (newPlumber) {
              res.json(newPlumber);
              console.log('plumber added');
            }
          })
        }
      }
    })
  }

  const bookings = function(req, res, next) {
var fullName = req.params.fullName;
    models.plumbers.findOne({
      fullName: req.params.fullName
    }, function(err, plumber) {
      if (err) {
        return next(err);
      }
      if (plumber) {
        res.json(plumber);
      }
    })
  }

  //book a plumber in a particular time slot for a particular day
  const book = function(req, res, next) {
    console.log('=========');
    var id = req.params.id;
    var slot = req.params.slot;
    var day = req.params.day;

    models.plumbers.findOne({
      _id: req.params.id
        }, function(err, result) {
      if (err) {
        return next(err)
      }
      if (result) {

        result.bookings.push({
          day: req.params.day,
          slot: req.params.slot
        })
        result.save(function(err, booked) {
          console.log(booked);
          if (booked) {
            res.json(booked)
          }
          if (err) {
            return next(err);
          }
        })
        console.log('done');
      }
    })
  }

  return {
    home,
    bookings,
    book,
    plumber,
    index
  }

} //END
