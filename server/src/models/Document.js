import mongoose, { Schema } from "mongoose";

const DocSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  content: {
    type: Object, 
    default: {
      "ops": [
        {
          "insert": "Welcome to our application!\n",
          "attributes": {
            "bold": true,
            "color": "#ff0000"
          }
        },
        {
          "insert": "We hope you have a great experience.\n"
        },
        {
          "insert": "If you have any questions, feel free to reach out to our support team.",
          "attributes": {
            "italic": true
          }
        }
      ]
    }
    
     
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true  // This will automatically add createdAt and updatedAt fields
});

export const DocModel = mongoose.model("Doc", DocSchema);
