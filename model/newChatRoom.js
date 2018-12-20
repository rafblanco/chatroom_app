var orm = require("../config/orm.js");

var newChatRoom = {
    createTable: function(cb){
        orm.all("chats2", function(res){
            cb(res); 
        });
    }
}; 

module.exports = newChatRoom;