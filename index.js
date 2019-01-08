var express = require("express");
var path=require('path');
var passport = require("passport");
var LocalStrategy  = require("passport-local");
var passportLocalMongoose  = require("passport-local-mongoose");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require("multer");
var flash = require("connect-flash");
var noUiSllider = require("nouislider");
var client = require("twilio")('AC6680a85dd0890f1837dc5aa5f2b28d7b' , ' 1ace0457a6312b5ee9502ece6bce43a6 ');

var Client = require("./newclient");
var Attendance = require("./attendance");
var Body = require("./bodymeasurement");
var Work = require("./workout");
var Diet = require("./diet");
var Document = require("./documents");
var Expense = require("./expense");
var Addpackage = require("./addpackage");
var Trainer = require("./trainer");
var Trainerdocument = require("./trainerdocument");
var Asset = require("./businessasset");
var Enquiry = require("./enquiry");
var Response = require("./response");
var Payment = require("./payment");
var Employee = require("./employee");

var count;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/Freastal_technologies", function(err , db)
  {
    if(err)
    {
      console.log(err);
    }
    else
    {
      db.collection("clients").count().then(function(result){
        console.log(result);
        count = result;

      } , function(err){
        return console.log(err);
      });
      console.log("database has been connected!");
    }
  });

app.use(flash());
app.use(require("express-session")({
    secret: "books page",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use('', express.static(path.join(__dirname + '')));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine" , "ejs");

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});



var tarikh;
var ip;
var imgname = " " ;
var space = " " ; 
var profilename;
var tarikh2;
var docname;
var apikey = "AC4bf6771c8ff8b1a02b22bcd55a560a06";
var apitoken = "7f5abd8bc5ccda454b6bd492aafb23f4";
// app.use(require("express-session")({
//     secret: "books page",
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());



// app.use(function(req,res,next){
//    res.locals.currentUser = req.user;
//    next();
// });

var number = "+15802385633";
app.get("/twilio" , function(req,res){
  client.messages.create ({
    to :    "+916377310289",
    from : "+15802385633",
    body : "hii there is robin jain"
  } , function(err , data){
    if(err)
    {
      console.log(err);
    }else{
      console.log("message is send");
      console.log(data);
    }
  });
});

app.post("/sms/:id" , function(req,res){
  var body = req.body.sms;
  console.log(body);
  Client.findById(req.params.id , function(err , user ){
    if(err)
    {
      console.log(err);
    }else{
      console.log("*******************************************************************");
      console.log(user.contactno);
      console.log(user);
      var contactno = user.contactno;
      console.log("+91" + contactno);
      client.messages.create({
         to   : "+91" + contactno,
         from : "+15802385633",
         body : body
      } , function(err , data){
        if(err)
        {
          console.log(err);
        }else{
          console.log("message is send");
          console.log("****************************###################################");
          console.log(data);
        }
      });
    }
  });
});

app.get("/sms/:id" , function(req,res){
  Client.findById(req.params.id , function(err , client){
    if(err)
    {
      console.log(err);
    }else{
      res.render("clientsms" , { client : client });
    }
  });
});


app.post("/newclient" , function(req,res){
  console.log(req.body);
  var invoiceno = req.body.invoiceno;
  var profile = req.body.profilename;
  var clientname = req.body.clientname;
  var membershipid = req.body.membershipid;
  var contactno = req.body.contactno;
  var alternatecontactno = req.body.alternatecontactno;
  var gender = req.body.group1;
  var address = req.body.address;
  var profession = req.body.profession;
  var email = req.body.email;
  var marriageanniversary = req.body.marriageanniversary;
  var dob = req.body.DOB;
  var clientsource = req.body.clientsource;
  var dateofbill = req.body.dateofbill;
  var dateofjoining = req.body.dateofjoining;
  var packages = req.body.packages;
  var duration = req.body.duration;
  var packagefees = req.body.packagefees;
  var packageenddate = req.body.packageenddate;
  var discount = req.body.discount;
  var tax = req.body.tax;
  var amountpayable = req.body.amountpayable;
  var amountpaid = req.body.amountpaid;
  var paymentmethod = req.body.paymentmethod;
  var pendingamount = req.body.pendingamount;
  var trainer = req.body.trainer;
  var remarks = req.body.remarks;
  var newclient = {invoiceno : invoiceno ,profile : profile ,  clientname : clientname , membershipid : membershipid , contactno : contactno , alternatecontactno : alternatecontactno , gender : gender , address : address , profession : profession , email : email , marriageanniversary : marriageanniversary , dob : dob , clientsource : clientsource , dateofbill : dateofbill , dateofjoining : dateofjoining , packages : packages , duration : duration , packagefees : packagefees , packageenddate : packageenddate , discount : discount , tax : tax , amountpayable : amountpayable , amountpaid : amountpaid , paymentmethod : paymentmethod , pendingamount : pendingamount , trainer : trainer , remarks : remarks};
  Client.create(newclient , function(err,client){
    if(err)
    {
      console.log(err);
    }else{
      console.log(client);
      console.log(req.body.client);
      req.flash("success" , "signup succesfully");
            res.redirect("/");
        }
      });
});

app.post("/admin" , function(req,res){
  var username = req.body.username;admin
  var password = req.body.password;
  if(username === "admin" && password === "12345")
  {
   res.redirect("/");
  }
  else{
    req.flash("error"  , "password is 12345" );
    res.render("admin");
  }
});

app.post("/search" , function(req,res){
 var option = req.body.option;
 var optionvalue = req.body.clientname;
 var data = {option : option , optionvalue : optionvalue};
 console.log(data);
 Client.find({ _id : optionvalue } , function(err , client){
   if(err){
    req.flash("error" , "please enter only client id");
    res.redirect("/");
    console.log(err);
   }else{
    console.log(client);
    console.log(client.clientname);
    res.render("details" , {client : client});
   }
 });
});

app.post("/details/search/:id" , function(req,res){
  var date = req.body.date;
  Client.findById(req.params.id , function(err,client){
    if(err)
    {
      console.log(err);
    }else{
      Body.find({date : date} , function(err , body){
        if(err){
          console.log(err);
        }else{
          console.log("========================robin=========================");
          console.log(body[0]._id);
          ip = body[0]._id;
          tarikh2 = body[0].date;
          console.log("=======================robin============================");
           res.redirect("/details/body/" + req.params.id);
        }
      });
    }
  });
});

app.get("/details/:id" , function(req,res){
 Client.findById(req.params.id , function(err , client){
   if(err)
   {
    console.log(err);
   }
   else{
    // console.log("############++++++++++++++++++++++++++++++++++++++++++++++++");
    // console.log(client);
    res.render("details" , {client : client});
   }
 });
});

app.get("/profile/:id" , function(req,res){
  Client.findById(req.params.id , function(err , client){
   if(err)
   {
    console.log(err);
   }
   else{
    res.render("profile" , {client : client});
   }
  });
});

app.post("/details/body/:id" , function(req,res){
  var date = req.body.date;
  var height = req.body.height;
  var weight = req.body.weight;
  var neck = req.body.neck;
  var shoulder = req.body.shoulder;
  var chestextended = req.body.chestextended;
  var chestnormal = req.body.chestnormal;
  var forearms = req.body.forearms;
  var biceps = req.body.biceps;
  var wrist = req.body.wrist;
  var upperabs = req.body.upperabs;
  var lowerabs = req.body.lowerabs;
  var waist = req.body.waist;
  var hips = req.body.hips;
  var thigh = req.body.thigh;
  var calves = req.body.calves;
  var ankles = req.body.ankles;
  var body = {date : date , height : height , weight : weight , neck : neck , shoulder : shoulder , chestextended : chestextended , chestnormal : chestnormal , forearms : forearms , biceps : biceps , wrist : wrist , upperabs : upperabs , lowerabs : lowerabs , waist : waist , hips : hips , thigh : thigh , calves : calves , ankles : ankles};
  Body.create(body , function(err,body){
    if(err){
      console.log(err);
    }else{
      // console.log("===================king==========================");
      // console.log(body.date);
      tarikh = body.date;
      // console.log(tarikh);
      // console.log("=====================king===========================");
      req.flash("success" , "your details are added");
      res.redirect("/details/body/" + req.params.id);
    }
  });
});

app.get("/details/body/:id" , function(req,res){
   Client.findById(req.params.id , function(err,client){
    if(err)
    {
      console.log(err);
    }else{
      //console.log(client);
      // console.log("ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp");
      // console.log(tarikh);
      // console.log(ip);
      // console.log(tarikh2);
          Body.find( {date : { $in: [tarikh , tarikh2]} } , function(err,clientbody){
              if(err){
                console.log(err);
              }else{
                // console.log(clientbody);
                // console.log("robin jain");
                // console.log("==================================================================");
                // console.log(client);
                res.render("bodymeasurement" , { body : clientbody ,  client : client});
              }
            });
          }
      });
    });

app.post("/details/addworkout/:id" , function(req,res){
  var date = req.body.date;
  var workoutname = req.body.workoutname;
  var workouttype = req.body.workouttype;
  var trainer = req.body.trainer;
  var preworkout = req.body.preworkout;
  var postworkout = req.body.postworkout;
  var exercise  = req.body.exercise;
  var reps = req.body.reps;
  var sets = req.body.sets;
  var rest = req.body.rest;
  var work = {date : date , workoutname : workoutname , workouttype : workouttype , trainer : trainer , preworkout : preworkout , postworkout : postworkout , exercise : exercise , reps : reps , sets : sets , rest : rest};
  console.log(work);
  Client.findById(req.params.id , function(err , client){
    if(err)
    {
      console.log(err);
    }else{
      Work.create(work , function(err , clientwork){
         if(err){
          console.log(err);
         }else{
          console.log("========================rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr=======================");
          console.log(clientwork);
          console.log("=======================rrrrrrrrrrrrrrrrrrrrrrrr======================");
          req.flash("success" , "your workout details is added");
          res.redirect("/details/workout/" + req.params.id);
         }
      });
    }
  });
});

app.get("/details/workout/:id" , function(req,res){
  Client.findById(req.params.id , function(err,client){
    if(err)
    {
      console.log(err);
    }else{
      Work.find({} , function(err , clientwork){
        if(err){
          console.log(err);
        }else{
           console.log("========================rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr=======================");
          console.log(clientwork);
           res.render("workoutplan" , {work : clientwork , client : client});
        }
      });
    }
  });
});

app.get("/details/:iw/removeworkout/:id" , function(req,res){
  Client.findById(req.params.id , function(err , client){
    if(err)
    {
      console.log(err);
    }else{
      Work.findById(req.params.iw , function(err,clientwork){
        if(err)
        {
          console.log(err);
        }else{
          Work.remove({_id : req.params.iw} , function(err){
            if(err)
            {
              console.log(err);
            }else{
              console.log("remove succesfully");
              res.redirect("/details/workout/" + req.params.id);
            }
          });
        }
      }); 
    }
  });
});

app.post("/details/adddiet/:id" , function(req,res){
  var date = req.body.date;
  var dietplanname = req.body.dietplanname;
  var dietplantype = req.body.dietplantype;
  var item = req.body.item;
  var quantity = req.body.quantity;
  var time = req.body.time;
  var specification = req.body.specification;
  var diet = {date : date , dietplanname : dietplanname , dietplantype : dietplantype , item : item , quantity : quantity , time : time , specification : specification};
  console.log(diet);
  Client.findById(req.params.id , function(err , client){
    if(err)
    {
      console.log(err);
    }else{
      Diet.create(diet , function(err , clientdiet){
         if(err){
          console.log(err);
         }else{
          console.log("========================rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr=======================");
          console.log(clientdiet);
          console.log("=======================rrrrrrrrrrrrrrrrrrrrrrrr======================");
          req.flash("success" , "your diet is added");
          res.redirect("/details/diet/" + req.params.id);
         }
      });
    }
  });
});

app.get("/details/diet/:id" , function(req,res){
  Client.findById(req.params.id , function(err,client){
    if(err)
    {
      console.log(err);
    }else{
      Diet.find({} , function(err , clientdiet){
        if(err){
          console.log(err);
        }else{
           console.log("========================rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr=======================");
          console.log(clientdiet);
           res.render("dietplan" , {diet : clientdiet , client : client});
        }
      });
    }
  });
});

app.get("/details/:iw/removediet/:id" , function(req,res){
  Client.findById(req.params.id , function(err , client){
    if(err)
    {
      console.log(err);
    }else{
      Diet.findById(req.params.iw , function(err,clientdiet){
        if(err)
        {
          console.log(err);
        }else{
          Diet.remove({_id : req.params.iw} , function(err){
            if(err)
            {
              console.log(err);
            }else{
              console.log("remove succesfully");
              res.redirect("/details/diet/" + req.params.id);
            }
          });
        }
      }); 
    }
  });
});

// app.get("/details/attendance/:id" , function(req,res){
//   Client.findById(req.params.id , function(err , client){
//     if(err)
//     {
//       console.log(err);
//     }
//     else
//     {
//       Attendance.find({clientid : req.params.id} , function(err , attendance){
//         if(err)
//         {
//           console.log(err);
//         }
//         else
//         {
//           res.render()
//         }
//       });
//     }
//   });
// });

//new client profile

var storage = multer.diskStorage({
  destination : "./views/profile/uploads/",
  filename : function(req,file,cb){
    cb(null , file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

//upload

var uploadse = multer({
  storage : storage,
  limits : {fileSize : 1000000000}
}).single("myProfile");

app.post("/newclientprofile" , function(req,res){
  uploadse(req,res,(err) => {
   if(err)
   {
    console.log("SOMETHING WENT WRONG");
    console.log(err);
    res.render("newclient" , {msg : err});
   }
   else{
    console.log(req.file);
    if(req.file == "undefined")
    {
      res.render("newclient" , {msg : "Error : no file slected"});
    }
    else{
    profilename = req.file.filename;
     console.log("send");
     console.log(profilename);
     req.flash("succes" , "your profile is added");
     res.redirect("/sending"); 
     //res.render("documents.ejs" , {  k : imgname ,  msg : "file uploaded!" , file : `uploads/${req.file.filename}` });
    }
   }
 });
});


app.get("/sending" , function(req,res){
   if(profilename == "undefined")
      {
        res.render("newclient" , {msg : "Error : no profile slected"});
      }
      else{
        console.log("####################$$$$$$$$$$$$$$$$$$$$$$$$$************************");
        console.log(client);
        console.log(profilename);
      res.render("newclient" , { k : profilename ,number : count ,  msg : "profile uploaded!"});
       }
});


var storage = multer.diskStorage({
  destination : "./views/uploads/",
  filename : function(req,file,cb){
    cb(null , file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

//upload

var upload = multer({
  storage : storage
});


app.post("/details/documents/:id" , upload.single('myImage'), function(req,res){
  var documentname = req.body.dname;
  var file = req.file.filename;
  var clientid = req.body.clientid;
  var data = {clientid : clientid ,  documentname : documentname , file : file };
  console.log("doneeeeeeeeeeeeeeeeeeeeeeeeeeee");
  console.log(data);
  console.log("imggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg");
  Client.findById(req.params.id , function(err,client){
    if(err){
      console.log(err);
    }else{
      Document.create(data , function(err,documents){
        if(err){
          console.log(err);
        }else{
          console.log(documents);
          console.log("created succesfully");
  upload.single('myImage')(req,res,(err) => {
   if(err)
   {
    console.log("SOMETHING WENT WRONG");
    console.log(err);
    res.render("documents.ejs" , {doc : documents.documentname , client : client , msg : err});
   }
   else{
    console.log(req.file);
    if(req.file == "undefined")
    {
      res.render("documents.ejs" , {doc : documents.documentname , client : client , msg : "Error : no file slected"});
    }
    else{
      console.log("))))))))))))))))))))))))))))))))))))))))))))))");
      console.log(documents);
      console.log(documents.documentname);
      docname = documents.documentname;
    imgname = req.file.filename;
     console.log("send");
     req.flash("success" , "your document is added");
     res.redirect("/details/documents/" + req.params.id); 
     //res.render("documents.ejs" , {  k : imgname ,  msg : "file uploaded!" , file : `uploads/${req.file.filename}` });
    }
   }
 });
  }
   });
}
});
});

app.get("/details/documents/:id/view" , function(req,res){
  Client.findById(req.params.id , function(err , client){
     if(err)
     {
      console.log(err);
     }else{
      console.log(imgname);
      Document.find({clientid : req.params.id} , function(err , result){
        if(err)
        {
          console.log(err);
        }else{
          console.log("robin jain...........................................");
          console.log(result);
      if(imgname == "undefined")
      {
        res.render("documents.ejs" , {doc : result , client : client , msg : "Error : no file selected"});
      }
      else
      {
        console.log("###############################################$$$$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%");
        console.log(client);
        console.log(imgname);
        res.render("documents" , {doc : result , client : client , msg : " "});
      }
      }
      });
     }
  });
});

app.get("/details/documents/:id" , function(req,res){
  Client.findById(req.params.id , function(err,client){
    if(err){
      console.log(err);
    }else{
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      Document.find({clientid : req.params.id} , function(err , result){
        if(err)
        {
          console.log(err);
        }
        else{
      console.log(imgname);
      if(imgname == " ")
      {
        res.render("documents.ejs" , {doc : result , client : client , k : imgname , msg : " "});
      }
      else{
        space = "file uploaded";
        console.log("####################$$$$$$$$$$$$$$$$$$$$$$$$$************************");
        console.log(client);
        //res.redirect("/details/document/show/" + req.params.id);
        res.render("documents.ejs" , {doc : result , client : client , k : imgname , msg : space});
       }
     }
     });
      }
  });
});

// app.get("/details/document/show/:id" , function(req,res){
//    Client.findById(req.params.id , function(err , client){
//       if(err){
//         console.log(err);
//       }
//       else{
//         console.log("!!!!!!!!!!!!!!!!@@@@@@@@@@@################");
//         console.log(imgname);
//         if(imgname == "undefined")
//         {
//           res.render("documents" , {msg : "Error : no file slected"});
//         }
//         else{
//           space = "file uploaded";
//           console.log(client);
//           res.render("documents.ejs" , {client : client , k : imgname , msg : space});
//         }
//       }
//    });
// });

app.post("/expense" , function(req,res){
  var date = req.body.date;
  var expensetype  = req.body.expensetype;
  var amountpaid = req.body.amountpaid;
  var modeofpayment = req.body.modeofpayment;
  var recipientname = req.body.recipientname;
  var description = req.body.description;
  var expense = {date : date , expensetype : expensetype , amountpaid : amountpaid , modeofpayment : modeofpayment , recipientname : recipientname , description : description};
  
  console.log("#######################################################################");
  console.log(modeofpayment);
  console.log(expense);
  console.log("########################################################################");

  Expense.create(expense , function(err , expense){
   if(err)
   {
    console.log(err);
   }else{
    console.log(expense);
    console.log("expense is created");
    req.flash("success" , "your expenses is added");
    res.redirect("/expense");
   }
  });
});  

app.post("/expense/edit/update/:id" , function(req,res){
  var date = req.body.date;
  var expensetype  = req.body.expensetype;
  var amountpaid = req.body.amountpaid;
  var modeofpayment = req.body.modeofpayment;
  var recipientname = req.body.recipientname;
  var description = req.body.description;
  Expense.findById(req.params.id , function(err , expense){
    if(err)
    {
      console.log(err);
    }else{
      Expense.update({_id : req.params.id} , {date : date , expensetype : expensetype , amountpaid : amountpaid , modeofpayment : modeofpayment , recipientname : recipientname , description : description} , function(err , expense){
        if(err)
        {
          console.log(err);
        }else{
          console.log(expense);
          console.log("update succesfully");
          req.flash("success" , "your expenses is updated");
          res.redirect("/expense");
        }
      });
    }
  });
});

app.get("/expense/edit/:id" , function(req,res){
 Expense.findById(req.params.id , function(err , expense){
   if(err)
   {
    console.log(err);
   }else{
    res.render("expenseupdate" , {expense : expense});
   }
 });
});

app.get("/expense/delete/:id" , function(req,res){
  Expense.findById(req.params.id , function(err , expense){
    if(err)
    {
      console.log(err);
    }else{
 Expense.remove({ _id : req.params.id } , function(err){
  if(err){
    console.log(err);
  }else{
    console.log("remove succesfully");
    res.redirect("/expense");
  }
 }); 
   }
});
  });

app.get("/expense" , function(req,res){
  Expense.find({} , function(err , expense){
    if(err){
      console.log(err);
    }else{
      res.render("expense" , { expense : expense});
    }
  });
});

app.post("/setting/addpackage" , function(req,res){
  var clientname = req.body.clientname;
  var packagename = req.body.packagename;
  var duration = req.body.duration;
  var packagefees = req.body.packagefees;
  var status = req.body.status;
  var package = { clientname : clientname , packagename : packagename , duration : duration , packagefees : packagefees , status : status };
  console.log(package);
  Addpackage.create(package , function(err , package){
    if(err)
    {
      console.log(err);
    }else{
      req.flash("success" , "your package is added");
      res.redirect("/setting/addpackage");
    }
  });
});

app.get("/setting/addpackage/edit/:id" , function(req,res){
  Addpackage.findById(req.params.id , function(err , package){
    if(err)
    {
      console.log(err);
    }else{

      res.render("addpackageupdate" , { package : package});
    }
  });
});

app.post("/setting/addpackage/edit/update/:id" , function(req,res){
  var clientname = req.body.clientname;
  var packagename = req.body.packagename;
  var duration = req.body.duration;
  var packagefees = req.body.packagefees;
  var status = req.body.status;
  var updatepackage = { clientname : clientname , packagename : packagename , duration : duration , packagefees : packagefees , status : status };
  console.log(updatepackage);
  Addpackage.findById(req.params.id  ,function(err , package){
    if(err)
    {
      console.log(err);
    }else{
  Addpackage.update({_id : req.params.id} , {clientname : clientname , packagename : packagename , duration : duration , packagefees : packagefees , status : status } , function(err , package){
     if(err)
     {
      console.log(err);
     }else{
      req.flash("success" , "your package is updated");
      res.redirect("/setting/addpackage");
     }
  });
    }
  });
});

app.get("/setting/addpackage" , function(req,res){
  Addpackage.find({} , function(err , package){
    if(err)
    {
      console.log(err);
    }else{
      res.render("addpackage" , { package : package });
    }
  });
});

//trainer

app.post("/trainer" , function(req,res){
  var trainername = req.body.trainername;
  var dob = req.body.dob;
  var comission = req.body.comission;
  var password = req.body.password;
  var contactno = req.body.contactno;
  var email = req.body.email;
  var gender = req.body.group1;
  var salary = req.body.salary;
  var confirmpassword = req.body.confirmpassword;
  var address = req.body.address;
  var status = req.body.status;
  var trainer = { trainername : trainername , dob : dob , comission : comission , password : password , contactno : contactno , email : email , gender : gender , salary : salary , confirmpassword : confirmpassword , address : address , status : status };
  console.log(trainer);
  Trainer.create(trainer  , function(err , trainer){
    if(err)
    {
      console.log(err);
    }else{
      console.log(trainer);
      req.flash("success" , "trainer is added");
      res.redirect("/trainer");
    }
  });
});

app.post("/trainer/edit/:id" , function(req,res){
   var trainername = req.body.trainername;
  var dob = req.body.dob;
  var comission = req.body.comission;
  var password = req.body.password;
  var contactno = req.body.contactno;
  var email = req.body.email;
  var gender = req.body.group1;
  var salary = req.body.salary;
  var confirmpassword = req.body.confirmpassword;
  var address = req.body.address;
  var status = req.body.status;
  var trainer = { trainername : trainername , dob : dob , comission : comission , password : password , contactno : contactno , email : email , gender : gender , salary : salary , confirmpassword : confirmpassword , address : address , status : status };
  Trainer.findById(req.params.id , function(err , trainer){
    if(err)
    {
      console.log(err);
    }else{
      Trainer.update({_id : req.params.id} , {trainername : trainername , dob : dob , comission : comission , password : password , contactno : contactno , email : email , gender : gender , salary : salary , confirmpassword : confirmpassword , address : address , status : status} , function(err , trainer){
        if(err)
        {
          console.log(err);
        }else{
          req.flash("success" , "trainer is updated");
          res.redirect("/trainer");
        }
      });
    }
  });
});

app.get("/trainer/edit/:id" , function(req,res){
  Trainer.findById(req.params.id , function(err , trainer){
    if(err)
    {
      console.log(err);
    }else{
      res.render("trainerupdate" , { trainer : trainer});
    }
  });
});

app.get("/trainer" , function(req,res){
  Trainer.find({} , function(err , trainers){
    if(err)
    {
      console.log(err);
    }else{
      res.render("trainer" , { trainer : trainers} );
    }
  });
});

app.get("/trainer/delete/:id" , function(req,res){
  Trainer.remove({_id : req.params.id} , function(err , trainer){
    if(err)
    {
      console.log(err);
    }
    else{
      req.flash("success" , "trainer is succesfully deleted");
      res.redirect("/trainer");
    }
  });
});


// var storages = multer.diskStorage({
//   destination : "./views/traineruploads/",
//   filename : function(req,file,cb){
//     cb(null , file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//   }
// });



//upload

// var uploads = multer({
//   storage : storages,
//   limits : {fileSize : 1000000000000000}
// }).single("document");


// app.post("/trainer/upload/:id" , function(req,res){
//   var file = req.body.document;
//   var data = { file : file };
//   console.log(data);
//   console.log("imggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg");
//   Trainer.findById(req.params.id , function(err,trainer){
//     if(err){
//       console.log(err);
//     }else{
//       Trainerdocument.create(data , function(err,documents){
//         if(err){
//           console.log(err);
//         }else{
//           console.log(documents);
//           console.log("created succesfully");
//   uploads(req,res,(err) => {
//    if(err)
//    {
//     console.log(err);
//     res.render("trainer.ejs" , { msg : err});
//    }
//    else{
//     console.log(req.file);
//     if(req.file == "undefined")
//     {
//       res.render("trainer.ejs" , {msg : "Error : no file slected"});
//     }
//     else{
//     imgname = req.file.filename;
//      console.log("send");
//      req.flash("success" , "trainer profile is uploaded");
//      res.redirect("/trainer"); 
//      //res.render("documents.ejs" , {  k : imgname ,  msg : "file uploaded!" , file : `uploads/${req.file.filename}` });
//     }
//    }
//  });
//   }
//    });
// }
// });
// });

app.get("/employee" , function(req,res){
  Employee.find({} , function(err , employee){
    if(err)
    {
      console.log(err);
    }
    else{
      res.render("employee" , {employee : employee});
    }
  });
});

app.post("/employee" , function(req,res){
  var employeename = req.body.employeename;
  var dob = req.body.dob;
  var email = req.body.email;
  var contactno = req.body.contactno;
  var gender = req.body.gender;
  var salary = req.body.salary;
  var address = req.body.address;
  var status = req.body.status;
  var data = {employeename : employeename , dob : dob , email : email , contactno : contactno , gender : gender , salary : salary , address : address , status : status};
  Employee.create(data , function(err , employee){
    if(err)
    {
      console.log(err);
    }
    else{
      req.flash("sucesss" , "employee is added");
      res.redirect("/employee");
    }
  });
});

app.get("/employee/edit/:id" , function(req,res){
  Employee.findById(req.params.id, function(err , employee){
    if(err)
    {
      console.log(err);
    }
    else{
      res.render("employeeupdate" , {employee : employee});
    }
  });
});

app.post("/employee/edit/:id" , function(req,res){
  var employeename = req.body.employeename;
  var dob = req.body.dob;
  var email = req.body.email;
  var contactno = req.body.contactno;
  var gender = req.body.gender;
  var salary = req.body.salary;
  var address = req.body.address;
  var status = req.body.status;
  var data = {employeename : employeename , dob : dob , email : email , contactno : contactno , gender : gender , salary : salary , address : address , status : status};
  Employee.findById(req.params.id , function(err , employee){
    if(err)
    {
      console.log(err);
    }
    else{
      Employee.update({employeename : employeename , dob : dob , email : email , contactno : contactno , gender : gender , salary : salary , address : address , status : status} , function(err , employee){
        if(err)
        {
          console.log(err);
        }
        else{
          req.flash("success" , "employee is updated");
          res.redirect("/employee");
        }
      });
    }
  });
});

app.get("/employee/delete/:id" , function(req,res){
  Employee.remove({_id : req.params.id} , function(err , employee){
    if(err)
    {
      console.log(err);
    }
    else{
      req.flash("success" , "employee is removed");
      res.redirect("/employee");
    }
  });
}); 

app.post("/asset" , function(req,res){
  var assetname = req.body.assetname;
  var description = req.body.description;
  var dateofpurchase = req.body.dateofpurchase;
  var warrantyexpiredate = req.body.warrantyexpiredate;
  var nextservice = req.body.nextservice;
  var latestservice = req.body.latestservice;
  var repairdescription = req.body.repairdescription;
  var asset = { assetname : assetname , description : description , dateofpurchase : dateofpurchase , warrantyexpiredate : warrantyexpiredate , nextservice : nextservice , latestservice : latestservice , repairdescription : repairdescription };
  Asset.create(asset , function(err,asset){
    if(err)
    {
      console.log(err);
    }else{
      req.flash("success" , "asset is added");
      res.redirect("/asset");
    }
  });
});

app.post("/asset/edit/:id" , function(req,res){
   var assetname = req.body.assetname;
  var description = req.body.description;
  var dateofpurchase = req.body.dateofpurchase;
  var warrantyexpiredate = req.body.warrantyexpiredate;
  var nextservice = req.body.nextservice;
  var latestservice = req.body.latestservice;
  var repairdescription = req.body.repairdescription;
  var asset = { assetname : assetname , description : description , dateofpurchase : dateofpurchase , warrantyexpiredate : warrantyexpiredate , nextservice : nextservice , latestservice : latestservice , repairdescription : repairdescription };
  Asset.findById(req.params.id , function(err , asset){
    if(err)
    {
      console.log(err);
    }else{
      Asset.update({_id : req.params.id} , {assetname : assetname , description : description , dateofpurchase : dateofpurchase , warrantyexpiredate : warrantyexpiredate , nextservice : nextservice , latestservice : latestservice , repairdescription : repairdescription} , function(err , asset){
        if(err)
        {
          console.log(err);
        }else{
          req.flash("success" , "assets are updated");
          res.redirect("/asset");
        }
      });
    }
  });
});

app.get("/asset/delete/:id" , function(req,res){
 Asset.findById(req.params.id , function(err , asset){
   if(err)
   {
    console.log(err);
   }else{
    Asset.remove({_id : req.params.id} , function(err){
      if(err)
      {
        console.log(err);
      }else{
        res.redirect("/asset");
      }
    });
   }
 });
});

app.get("/asset/edit/:id" , function(req,res){
  Asset.findById(req.params.id , function(err , asset){
   if(err)
   {
    console.log(err);
   }else{
    res.render("assetupdate" , {asset : asset});
   }
  });
});

app.get("/asset" , function(req,res){
  Asset.find({} , function(err , asset){
    if(err)
    {
      console.log(err);
    }else{
      res.render("businessassets" , {asset : asset});
    }
  });  
});

app.post("/enquiry" , function(req,res){
  var clientname  = req.body.clientname;
  var contactno  = req.body.contactno;
  var altcontactno = req.body.altcontactno;
  var enquiryfor  = req.body.enquiryfor;
  var nextfollowup = req.body.nextfollowup;
  var trialdate = req.body.trialdate;
  var followuptime = req.body.followuptime;
  var type = req.body.Type;
  var status = req.body.status;
  var response = req.body.response;
  var attendedby = req.body.attendedby;
  var source = req.body.source;
  var enquiry = { clientname : clientname , contactno : contactno , altcontactno : altcontactno , enquiryfor : enquiryfor , nextfollowup : nextfollowup , trialdate : trialdate , followuptime : followuptime , type : type , status : status , response : response , attendedby : attendedby , source : source};
  Enquiry.create(enquiry , function(err , enquiry){
    if(err)
    {
      console.log(err);
    }else{
      req.flash("success" , "enquiry is added");
      res.redirect("/enquiry");
    }
  });
});

app.get("/enquiry" , function(req,res){
 Enquiry.find({} , function(err , enquiry){
   if(err){
    console.log(err);
   }else{
    res.render("enquiry" , { enquiry : enquiry });
   }
 });
});

app.get("/addresponse/:id" , function(req, res){
  Client.findById(req.params.id , function(err , client){
   if(err)
   {
    console.log(err);
   }else{
    Enquiry.find({clientname : client.clientname})
   }
  });
});

app.post("/response/:id" , function(req,res){
  var response = req.body.response;
  console.log(response);
  Client.findById(req.params.id , function(err , client){
   if(err){
    console.log(err);
   }else{
    var clientid = client._id;
    var response = { clientid : clientid , response : req.body.response};
    console.log(response);
    Response.create(response , function(err,response){
      if(err){
        console.log(err);
      }else{
        console.log("response is added");
        req.flash("success" , "response is added");
        res.redirect("/");
      }
    }); 
   }
  });
});

app.get("/response/:id" , function(req,res){
  Client.findById(req.params.id , function(err , client){
    if(err){
      console.log(err);
    }else{
      res.render("response" , {client : client});
    }
  });
});

app.post("/applypayment/:id" , function(req,res){
  var amount = req.body.amount;
  var date = req.body.date;
  var status = req.body.status;
  var paymentmethods = req.body.paymentmethods;
  Client.findById(req.params.id , function(err , client){
    if(err)
    {
      console.log(err);
    }else{
    var payment = { invoiceno : client.invoiceno , clientname : client.clientname , membershipid : client.membershipid , contactno : client.contactno , alternatecontactno : client.alternatecontactno , gender : client.gender , address : client.address , profession : client.profession , email : client.email , marriageanniversary : client.marriageanniversary , dob : client.dob , clientsource : client.clientsource , dateofbill : client.dateofbill , dateofjoining : client.dateofjoining , packages : client.packages , duration : client.duration , packagefees : client.packagefees , packageenddate : client.packageenddate , discount : client.discount , tax : client.tax , amountpayable : client.amountpayable , amountpaid : client.amountpaid , paymentmethod : client.paymentmethod , pendingamount : client.pendingamount , trainer : client.trainer , remarks : client.remarks , amount : amount , date : date , status : status , paymentmethods : paymentmethods}
    Payment.create(payment , function(err,payment){
      if(err)
      {
        console.log(err);
      }else{
        console.log("the bill is updated");
        req.flash("success" , "bill is updated");
        res.redirect("/");
      }
    });
    }
  });
});

app.get("/applypayment/:id" , function(req,res){
  Client.findById(req.params.id , function(err , client){
    if(err)
    {
      console.log(err);
    }else
    {
      res.render("payment" , { client : client });
    }
  });
});

app.get("/admin" , function(req,res){
  res.render("admin");
});

app.get("/newclient" , function(req,res){
  res.render("newclient" , { k : "" , number : count});
});

app.get("/client" , function(req,res){
  Client.find({} , function(err,clients){
    if(err)
    {
      console.log(err);
    }else{
      res.render("client" , {client : clients , count : count });
    }
  })
});

app.get("/attendance" , function(req,res){
  res.render("attendance");

});

app.post("/attendance" , function(req,res){
  var flag = req.body.flag;
  var clientid = req.body.clientid;
  var date = req.body.date;
  
  Client.findById(clientid , function(err , client){
     if(err)
     {
      console.log(err);
     }
     else{
      var data = {clientid : clientid , clientname : client.clientname , flag : flag , date : date};
  Attendance.create(data , function(err , attendance){
    if(err)
    {
      console.log(err);
    }
    else
    {
       req.flash("success" , "attendance is added");
       res.redirect("/");
    }
  });
    }
   });
});



app.get("/attendance/absent" , function(req,res){
  res.render("absent");
});

app.post("/attendance/absent" , function(req,res){
  var date = req.body.date;
  Attendance.find({$and: [{date : date} , {flag : 'Absent'}]}, function(err , attendance){
    if(err)
    {
      console.log(err);
    }
    else
    {
      //console.log(attendance);   
      res.render("absentshow" , {attendance : attendance});
    }
  })
});

app.get("/attendance/present" , function(req,res){
  res.render("present");
});

app.post("/attendance/present" , function(req,res){
  var date = req.body.date;
  Attendance.find({$and: [{date : date} , {flag : 'Present'}]} , function(err , attendance){
    if(err)
    {
      console.log(err);
    }
    else
    {
      //console.log(attendance);
      res.render("presentshow" , {attendance : attendance});
    }
  })
});

app.get("/details/attendance/:id" , function(req,res){
  Attendance.find({'clientid' : req.params.id} , function(err , attendance){
    if(err)
    {
      console.log(err);
    }
    else
    {
      //console.log(attendance);
      res.render("presentshow" , {attendance : attendance});
    }
  });
});


app.get("/" , function(req,res){
  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search),'gi');
    Client.find({clientname : regex},function(err,client){
      if(err)
      {
        console.log(err);
      }else{
        console.log(client);
        res.render("details",{client : client});
      }
    });

  }
  else{
  Client.find({pendingamount: { $gt: 0 }} , function(err,result1){
     if(err){
      console.log(err);
     }else{
  Client.find({ pendingamount: { $in: [ 0 , "" ] } } , function(err,result2){
    if(err){
      console.log(err);
    }else{
      res.render("home" , {clients1 : result1 , clients2 : result2 , count : count});
    }
  });
     }
  });
 }
});




function escapeRegex(text)
{
   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");
};

app.listen("5000" , function(req,res){
  console.log("server is started");
});