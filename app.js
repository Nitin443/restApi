const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model("Article", articleSchema);

// making restful api
// using get method to get all articles
/*  app.get("/articles", function(req, res){
  Article.find(function(err, foundArticles){
    if(!err){
      res.send(foundArticles);
    }else{
      res.send(err);
    }
  });
});

//using post method
app.post("/articles", function(req, res){
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err){
    if(!err){
      console.log(newArticle);
      res.send("sucessfully save data");
    }else{
      res.send(err);
    }
  });

});

// using delete method to delete all articles
app.delete("/articles", function(req, res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Delete sucessfully !");
    }else{
      res.send(err);
    }
  });
});     */

// using route chaining method
app.route("/articles").get(function(req, res){  // get method
  Article.find(function(err, foundArticles){
    if(!err){
      res.send(foundArticles);
    }else{
      res.send(err);
    }
  });
})
.post(function(req, res){     // post method
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err){
    if(!err){
      console.log(newArticle);
      res.send("sucessfully save data");
    }else{
      res.send(err);
    }
  });

})
.delete(function(req, res){    // delete method
  Article.deleteMany(function(err){
    if(!err){
      res.send("Delete sucessfully !");
    }else{
      res.send(err);
    }
  });
});



// useing route method for specified tasks.
 app.route("/articles/:articleTitle")
 .get(function(req, res){      // use get method to get specified article
   Article.findOne({title:req.params.articleTitle}, function(err, foundList){
     if(foundList){
       res.send(foundList);
     }else{
       res.send("No article found");
     }
   });
 })

 .put(function(req, res){   // use put method to update specified article
   Article.findOneAndUpdate({title: req.params.articleTitle}, {title: req.body.title, content: req.body.content}, {overwrite: true}, function(err){
     if(!err){
       res.send("sucessfully updated data");
     }else{
       res.send("No updated data");
     }
   });
 })

 .patch(function(req, res){  // use patch method to update  particular specified article value
   Article.update({title: req.params.articleTitle}, {$set: req.body}, function(err){
     if(!err){
       res.send("update sucessfully");
     }else{
       res.send("Not update");
     }
   });
 })

 .delete(function(req, res){   // use delete method to delete specified article
   Article.deleteOne({title: req.params.articleTitle}, function(err){
     if(!err){
       res.send("sucessfully Delete");
     }else{
       res.send("Not Delete");
     }
   });
 });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
