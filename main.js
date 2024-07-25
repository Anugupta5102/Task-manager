const express=require('express');
const app=express();

const path=require('path');
const fs=require('fs');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
//creating route and showing main.ejs page
app.get('/', function(req,res){
    fs.readdir(`./files`, function(err,files){
        //console.log(files);
        res.render("main",{files: files});//ejs file name
    })
    
})
//getting files from file folder and displaying it on show.ejs page
app.get('/files/:filename', function(req,res){//filename in the params
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err,filedata){//utf-8 buffer data ko english me kar dega
        //console.log(files);
        res.render("show",{filename: req.params.filename, filedata:filedata});//ejs file name
    })
    
})
//edit of file name and showing it on edit.ejs page
app.get('/edit/:filename', function(req,res){//filename in the params
        res.render("edit",{filename: req.params.filename});
    })
//edit form is submit  then it renames. *disabled=true is used so that we cannot modify old name
app.post('/edit', function(req,res){
   // console.log(req.body)
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`,function(err){
        res.redirect('/')
    });
})
       

//when the button is clicked(form submitted) it creates task file with their details
app.post('/create', function(req,res){
        //console.log(req.body);
        //(path,data,callback)
        fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details, function(err){
        res.redirect('/')
        });//split returns the array of words then we join it using '' which gives us string removing spaces

        
    })

app.listen(3000);