let emailSender = require('nodemailer')

let yourEmail = 'youremail@gmail.com'
let yourPass = 'yourpassword'

var transporter = emailSender.createTransport({
    service: 'gmail',
    auth: {
      user: yourEmail,
      pass: yourPass
    }
  });
  
  var mailInfo = {
    from: yourEmail,
    to: 'yourfriends@gmail.com',
    subject: 'Sending Email using Node.js',
    text: '21st Century technology is insane'
  };
  
  transporter.sendMail(mailInfo, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });