import mongoose, { Schema } from "mongoose";

const DocSchema = new mongoose.Schema({
    title:{type: String, required: true},
    author:{
        type:mongoose.Schema.Types.ObjectId,
    },
    content:{
        type: String,
        default:""
    }
    // collaborators:{

    // }
  });
  
  export const DocModel = mongoose.model("docs", DocSchema);