const Employee = require('../models/employee')
// restrict index for logged in user only

app.get('/',function(req,res,next){

    Employee.count().exec(function (err, count) {

      // Get a random entry
      var random = Math.floor(Math.random() * count);

      Employee.find({})
              .limit(3)
              .skip(random)
              .exec(function(err, data){
                  if(err){
                      return res.render('index', {featured: []});
                      next()
                  }

                  res.render('index', {featured: data});

              });
    });

});

// route to register page
app.get('/register_employee', function(req,res,next){
      res.render('signup_employee', {message: ""});
});

// route for register action
app.post('/register/employee', function(req,res,next){

});

// route to login page
app.get('/employee_login', function(req,res,next){
    res.render('login_employee', {message: ""});
});

// route for login action
app.post('/employee_login', function(req,res,next){

});

// route to login page
app.get('/employer_login', function(req,res,next){
    res.render('login_employer');
});

// route for login action
app.post('/employer_login', function(req,res,next){

});

// route for logout action
app.get('/logout/employee', function(req,res,next){

});

app.get('/account/employer', function(req,res,next){
    res.render('account_employer');
});

app.get('/profile/employer', function(req,res,next){
    res.render('profile_employer');
});
