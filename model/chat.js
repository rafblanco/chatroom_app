var orm = require("../config/orm.js");

var chat = {
    all: function(cb){
        orm.all("chats", function(res){
            cb(res); 
        });
    },
    createMessage: function(cols, vals, cb){
        orm.createMessage("chats", cols, vals, function(res){
            cb(res); 
        });
    },

    update: function(objColVals, condition, cb){
        orm.update("chats", objColVals, condition, function(res){
            cb(res); 
        }); 
    },

    delete: function(condition, cb){
        orm.delete("chats", condition, function(res){
            cb(res);
        });
    }
}; 

module.exports = chat;