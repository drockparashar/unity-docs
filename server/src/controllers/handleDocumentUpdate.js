import { DocModel } from "../models/Document.js";

const handleDocumentUpdate = async ({ _id, content }) => {
    try {
      // Find the document by ID and update its content
      console.log(_id,content);
      const updatedDoc = await DocModel.findByIdAndUpdate(
        _id,
        { content },
        { new: true }
      );

      if (!updatedDoc) {
        throw new Error("Document not found");
      }
  
      return { message: "Document updated",  updatedDoc };
    } catch (err) {
      console.error("Error updating document:", err);
      throw new Error(`Failed to update document: ${err.message}`);
    }
  };

  export default handleDocumentUpdate;