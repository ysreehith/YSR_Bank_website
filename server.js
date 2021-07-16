const express=require("express")
const app = express()
const fs=require('fs');
const bp=require('body-parser');
app.use(bp.urlencoded({ extended: false }))
const port = process.env.PORT || 3000
app.set("view engine","ejs")
app.use(express.static('public'));
var r,s;
app.get("/",(req,res)=>{
    res.render("index");
})
app.get('/Accounts.ejs', (req, res) => {
    fs.readFile('./store.json',(err,data1)=>{
  res.render('Accounts',{data:JSON.parse(data1)});
    })
    
  })
  app.get('/payment.ejs', (req, res) => {
      res.render('payment');
    })
  app.get('/History.ejs', (req, res) => {
    fs.readFile('./stores.json',(err,data)=>{
      res.render('History',{data:JSON.parse(data)});
    })
    
  })
  app.get('/Help.ejs', (req, res) => {
    res.render('Help');
  })
  app.get('/Notifications.ejs', (req, res) => {
    res.render('Notifications');
  })
  app.post('/ds',(req,res)=>{
  fs.readFile('./store.json',(err,data1)=>{
   let data=JSON.parse(data1);
   for(let i=0;i<11;i++){
     if(data.ACC_NO[i]==parseInt(req.body.sa_id))s=i;
     else if(data.ACC_NO[i]==parseInt(req.body.ra_id))r=i;
   }
  data.BALANCE[s]=data.BALANCE[s]-parseInt(req.body.attr);
  data.BALANCE[r]=data.BALANCE[r]+parseInt(req.body.attr);
  fs.writeFile('./store.json',JSON.stringify(data),(err)=>{
    if(err)throw err;
    fs.readFile('./stores.json',(err1,his)=>{
     let histo=JSON.parse(his);
     histo.history.push([data.ACC_NO[s],data.ACC_NO[r],parseInt(req.body.attr)]);
     fs.writeFile('./stores.json',JSON.stringify(histo),(err)=>{
       if(err)throw err;
       console.log('History saved');
     })
    })
    res.redirect('/Accounts.ejs');
  })  
  })
  })
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
