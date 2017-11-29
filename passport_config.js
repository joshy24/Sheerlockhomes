
// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the Employee model
var Employee  = require('./models/employee');

// expose this function to our app using module.exports
module.exports = function(passport) {


    passport.serializeUser(function(Employee, done) {
        done(null, Employee.id);
    });

    // used to deserialize the Employee
    passport.deserializeUser(function(id, done) {
        Employee.findById(id, function(err, Employee) {
            done(err, Employee);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'phone_number',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

        // asynchronous
        // Employee.findOne wont fire unless data is sent back
        process.nextTick(function() {

        if(password != req.body.password_again){
              return done(null, false, req.flash('signupMessage', 'The passwords entered dont match'));
        }
        else{
          // find a Employee whose email is the same as the forms email
          // we are checking to see if the Employee trying to login already exists
          Employee.findOne({ 'email' :  email }, function(err, acc) {
              // if there are any errors, return the error
              if (err)
                  return done(err);

              // check to see if theres already a Employee with that email
              if (acc) {
                  return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
              } else {

                  // if there is no Employee with that email
                  // create the Employee
                  var newEmployee = new Employee();

                  // set the Employee's local credentials
                  newEmployee.email    = email;
                  newEmployee.password = newEmployee.generateHash(password);

                  // save the Employee
                  newEmployee.save(function(err) {
                      if (err)
                          throw err;
                      return done(null, newEmployee);
                  });
              }

          });
        }


        });

    }));


    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses Employeename and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a Employee whose email is the same as the forms email
        // we are checking to see if the Employee trying to login already exists
        Employee.findOne({ 'email' :  email }, function(err, Employee) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(null, false, req.flash('loginMessage', err));

            // if no Employee is found, return the message
            if (!Employee){
                return done(null, false, req.flash('loginMessage', 'No Employee found.')); // req.flash is the way to set flashdata using connect-flash
            }

            // if the Employee is found but the password is wrong
            if (!Employee.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful Employee
            return done(null, Employee);
        });

    }));

};
