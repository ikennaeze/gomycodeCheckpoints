const express = require('express')
const path = require('path');
const app = express()

const requestTime = function (req, res, next) {
  req.requestTime = new Date()
  next()
}

app.use(requestTime)

app.get('/', (req, res) => {
    //if the request hour is earlier than 9am or greater than 5pm, restrict access to the page
  if(req.requestTime.getHours() < 9 || req.requestTime.getHours() > 17 )  
    res.status(403).end(`Access Denied (HTTP Status 403 Forbidden)`);
  else
    res.sendFile(path.join(__dirname, '../home.html'));
})

app.get('/services', (req, res) => {
    //if the request hour is earlier than 9am or greater than 5pm, restrict access to the page
  if(req.requestTime.getHours() < 9 || req.requestTime.getHours() > 17 )  
    res.status(403).end(`Access Denied (HTTP Status 403 Forbidden)`);
  else
    res.sendFile(path.join(__dirname, '../services.html'));
})

app.get('/contact', (req, res) => {
    //if the request hour is earlier than 9am or greater than 5pm, restrict access to the page
  if(req.requestTime.getHours() < 9 || req.requestTime.getHours() > 17 )  
    res.status(403).end(`Access Denied (HTTP Status 403 Forbidden)`);
  else
    res.sendFile(path.join(__dirname, '../contact.html'));
})

app.listen(3000)
