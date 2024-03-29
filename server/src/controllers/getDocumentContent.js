import { DocModel } from "../models/Document.js";

const getDocumentContent=async(_id)=>{
    try{
        const doc=await DocModel.findById(_id);

        if (!doc) {
            throw new Error("Document not found");
          }
    
        return { message: "Document found",  doc};
    }catch(err){
        console.error("Error get document:", err);
      throw new Error(`Failed to get document: ${err.message}`);
    }
}

export default getDocumentContent;