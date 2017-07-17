/**
 * Created by Administrator on 2017/6/18.
 */

var express = require("express");
var app = express();
var fs = require("fs");
var path = require( 'path' );
var multer = require("multer");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contacts");
var conn = mongoose.connection;
var gfs;
var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;
conn.once("open", function(){
    gfs = Grid(conn.db);
    app.get("/", function(req,res){
        //renders a multipart/form-data form
      //  res.render("home");
        res.sendfile( path.join(__dirname, '/views', 'home.html') ) ;
    });

    /*var upload = multer({dest: "./uploads"});*/
    var upload = multer( );
    //second parameter is multer middleware.
    app.post("/", upload.single("avatar"), function(req, res, next){
        //create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
        var writestream = gfs.createWriteStream({
            filename: req.file.originalname
        });
        console.log( 'gridfs-stream into' );
        //
        // //pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
        /*fs.createReadStream("./uploads/" + req.file.filename)
            .on("end", function(){fs.unlink("./uploads/"+ req.file.filename, function(err){res.send("success")})})
            .on("err", function(){res.send("Error uploading image")})
            .pipe(writestream);*/

        writestream.write( req.file.buffer );
        writestream.end();
        res.send("success");
    });

    // sends the image we saved by filename.
    app.get("/:filename", function(req, res){
        var readstream = gfs.createReadStream({filename: req.params.filename});
        readstream.on("error", function(err){
            res.send("No image found with that title");
        });
        readstream.pipe(res);
    });

    //delete the image
    app.get("/delete/:filename", function(req, res){
        gfs.exist({filename: req.params.filename}, function(err, found){
            if(err) return res.send("Error occured");
            if(found){
                gfs.remove({filename: req.params.filename}, function(err){
                    if(err) return res.send("Error occured");
                    res.send("Image deleted!");
                });
            } else{
                res.send("No image found with that title");
            }
        });
    });
});

app.set("view engine", "ejs");
app.set("views", "./views");



if (!module.parent) {
    app.listen(3000);
}
