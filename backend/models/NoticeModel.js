const Mongoose = require("mongoose");

const MongooseSchema = new Mongoose.Schema({
    Notice:{
        type:String,
        required:true
    },
    NoticeLink:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
const MongooseModel = Mongoose.model("Notice",MongooseSchema);

module.exports = MongooseModel;