var express = require("express");

var router = express.Router();

var chat = require("../model/chat.js");

router.get("/", function (req, res) {
    chat.all(function (data) {
        var messageObj = {
            messages: data
        };
        console.log(messageObj);
        res.render("index", messageObj); 
    }); 
});

router.post("/api/chat", function (req, res) {
    chat.createMessage([
        "name", "message"
    ],
        [
            req.body.name, req.body.message
        ],
        function (result) {
            res.json({id: result.insertId}); 

        });
});

router.put("/api/chat/:id", function (req, res) {
    var condtion = "id = " + req.params.id; 

    console.log("condition", condition);

    chat.update({
        message: req.body.message
    },
    condtion, function(result){
        if(result.changedRows == 0){
            return res.status(404).end(); 
        }
        else{
            res.status(200).end(); 
        }
    });
});

router.delete("/api/chats/:id", function(req, res){
    var condition = "id = " + req.params.id; 

    chat.delete(condition, function(result){
        if(result.affectedRows == 0){
            return res.status(404).end(); 
        }
        else{
            res.status(200).end(); 
        }
    });
});

module.exports.router; 

