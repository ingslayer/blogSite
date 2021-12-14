const express = require("express");
const bodyParser = require("body-parser");
const _ =require("lodash");


let homeStartingContent = "this is Home Content. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita quos, accusamus asperiores ipsum minus, dolores placeat nobis, provident omnis magni suscipit ab harum hic culpa consequuntur fugit illum consequatur a cum reprehenderit. Earum perferendis, assumenda distinctio neque a veniam deserunt accusamus dignissimos odio id numquam. Illum nesciunt quis possimus quaerat rerum voluptates ea debitis at porro reiciendis modi eaque magni nulla laboriosam harum maiores labore, pariatur id minima, exercitationem voluptatem nostrum! Repellat placeat sunt ullam, provident iusto quo iure blanditiis ratione architecto, ipsum dolor hic animi. Maxime enim, recusandae harum dolorem quidem, ipsam aspernatur aperiam quo minus maiores labore at."; 

let aboutContent = "this is About Content. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita quos, accusamus asperiores ipsum minus, dolores placeat nobis, provident omnis magni suscipit ab harum hic culpa consequuntur fugit illum consequatur a cum reprehenderit. Earum perferendis, assumenda distinctio neque a veniam deserunt accusamus dignissimos odio id numquam. Illum nesciunt quis possimus quaerat rerum voluptates ea debitis at porro reiciendis modi eaque magni nulla laboriosam harum maiores labore, pariatur id minima, exercitationem voluptatem nostrum! Repellat placeat sunt ullam, provident iusto quo iure blanditiis ratione architecto, ipsum dolor hic animi. Maxime enim, recusandae harum dolorem quidem, ipsam aspernatur aperiam quo minus maiores labore at."; 

let contactContent = "this is Contact Content. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita quos, accusamus asperiores ipsum minus, dolores placeat nobis, provident omnis magni suscipit ab harum hic culpa consequuntur fugit illum consequatur a cum reprehenderit. Earum perferendis, assumenda distinctio neque a veniam deserunt accusamus dignissimos odio id numquam. Illum nesciunt quis possimus quaerat rerum voluptates ea debitis at porro reiciendis modi eaque magni nulla laboriosam harum maiores labore, pariatur id minima, exercitationem voluptatem nostrum! Repellat placeat sunt ullam, provident iusto quo iure blanditiis ratione architecto, ipsum dolor hic animi. Maxime enim, recusandae harum dolorem quidem, ipsam aspernatur aperiam quo minus maiores labore at."; 

let posts=[];

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", function (req, res) {
    res.render("home",{
        homeBody:homeStartingContent,
        posts:posts,
    });
});
        // res.render("home",{title:"Home", titleContent:homeStartingContent});
        // res.render("home",{title:posts[0].compositionTitle, titleContent:posts[0].compositionBody});
        // let titleOfNewPost = posts[0].compositionTitle;
        // let bodyofNewPost = posts[0].compositionBody;
   
app.get("/about", function (req, res) {
    res.render("about",{titleContent:aboutContent});
});
app.get("/contact", function (req, res) {
    res.render("contact",{titleContent:contactContent});
});
app.get("/compose", function (req, res) {
    res.render("compose");
});
app.get("/posts/:postName",function(req,res){
    let found=0; // flag to check if the requested title is found in the post title inside posts array .
    const requestedTitle = _.lowerCase(req.params.postName); // check out lodash documentation
    posts.forEach(function (post){
        const storedTitle=_.lowerCase(post.compositionTitle);
        if(storedTitle===requestedTitle){
            found=1;
            res.render("post",{postTitle:post.compositionTitle, postContent:post.compositionBody});
            return ;  //this acts as a break in for each loop
        }
    });
    if(found===1){
        console.log("Requested Post Found!");
    }else{
        console.log("Requested Post Not Found!");
        res.redirect("/notFound");
    }
    // res.redirect("/");
});

app.get("/search",function(req,res){
    res.render("home",{
        homeBody:homeStartingContent,
        posts:posts,
    });
});

app.get("/notFound",function(req,res){
    res.send("<h1>Not Found !! </h1>");
});

app.post("/compose",function (req, res){
    const post ={
        compositionTitle:req.body.compositionTitle,
        compositionBody:req.body.compositionBody
    };
    posts.push(post);
    res.redirect("/");
});

app.post("/search",function(req,res){
    console.log(req.body.searchBar);
    let searchTitle= req.body.searchBar;
    res.redirect("/posts/"+searchTitle);
});



app.listen(3000, function () {
    console.log("Hosted at local port 3000");
});
