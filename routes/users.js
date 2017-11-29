const Employee = require('../models/employee')
const Subscribe = require('../models/subscribers')
var faker = require('faker');

app.get('/about', function(req,res,next){
    res.render('about');
});

app.get('/contact', function(req,res,next){
    res.render('contact');
});

app.get('/friends', function(req,res,next){
    res.render('friend');
});

app.get('/aunty', function(req,res,next){
    res.render('aunty');
});

app.get('/granny', function(req,res,next){
    res.render('granny');
});

app.post('/subscribe', function(req,res,next){
    if(req.body.email==null){
       res.render('index', {featured: []})
    }

    Subscribe.find({email:req.body.email}, function(err, value){
        if(err){
            res.render('index', {subscribe_error: "An Error occurred. Please try to subscribe again later", featured: []});
            next()
        }

        if(value.length>0){
            res.render('index', {subscribe_error: "Please enter another email address. That one is taking", featured: []});
            next()
        }

        var subscriber = new Subscribe();
        subscriber.email = req.body.email
        subscriber.save(function(err, data){
           if(err){
               res.render('/', {subscribe_error: "An Error occurred. Please try to subscribe again later"});
               next()
           }

           res.render('subscribe');

        })
    })
})

app.get('/users', function(req, res, next){

   var gender_array = ['Male', 'Female'];
   var emp_array = ['Maid', 'Driver'];

   for(var i=0;i<10;i++){

     var employee = new Employee();

     var emp_number = faker.random.number({min:0, max:emp_array.length});

     employee.phone_number = faker.PhoneNumber.phoneNumber();
     employee.type = 'Grannys';
     employee.photo_url = faker.Image.avatar();
     employee.firstname = faker.Name.firstNameFemale();
     employee.lastname = faker.Name.lastName();
     employee.state = faker.Address.brState();
     employee.average_rating = 4;
     employee.employment_status = 'unemployed';
     employee.age = 20;

     var gender_number = faker.random.number({min:0, max:gender_array.length});
     employee.gender = 'female';

     employee.save(function(err, res){
          if(err){
             console.log("error"+err.message)
          }

          console.log('success')

     })
   }
})

app.get('/employees/:page/type/:type', function(req,res,next){
  var perPage = 18
  var page = req.params.page || 1

  var type = req.params.type || 'Friend'

  Employee
      .find({type:type})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function(err, employees) {
        if (err) return next(err)
        Employee.find({type:type})
            .exec(function(err, empl_type){
                if (err) return next(err)
                res.render('employees', {
                    type: type,
                    employees: employees,
                    current: page,
                    pages: Math.ceil(empl_type.length / perPage)
                })
            })
      })
});
