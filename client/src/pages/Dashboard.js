import React, { useState, useEffect,useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/dashboard.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [newDocTitle, setNewDocTitle] = useState("");
  const [userId,setUserId]=useState(""); // Replace with actual user ID from authentication
  // const [docLink,setDocLink]=useState("");
  const navigate=useNavigate();
  const timeoutRef = useRef(null);


  useEffect(() => {
    // Fetch user documents
    const fetchDocuments = async () => {
      try {
        setUserId(window.localStorage.getItem('user'));
        const response = await axios.get(`https://unity-docs-2.onrender.com/doc/userDocs/${userId}`,
        );
        setDocuments(response.data);
        console.log(response.data)
      } catch (err) {
        console.error("Error fetching documents", err);
      }
    };

    fetchDocuments();
  }, [userId]);

  const handleCreateDocument = async () => {
    try {
      if(newDocTitle==="") return;
      const response = await axios.post("https://unity-docs-2.onrender.com/doc/create", { title: newDocTitle, author:userId });
      setDocuments([...documents, response.data]);
      setNewDocTitle(""); // Clear the input
      toast.success("Document created successfully!!");
      timeoutRef.current = setTimeout(() => {
        navigate(`/editor/${response.data}`);
      }, 1500);

    } catch (err) {
      console.error("Error creating document", err);
    }
  };



  return (
    <div className="user-home-page">
      <h1>Welcome to Your Document Dashboard</h1>
      <div className="new-document">
        <input
          type="text"
          value={newDocTitle}
          onChange={(e) => setNewDocTitle(e.target.value)}
          placeholder="Enter document title"
        />
        <button onClick={handleCreateDocument}>Create New Document</button>
      </div>
      <div className="document-list">
        <h2>Your Documents</h2>
        {documents.map((doc) => (
          <div className="docList" key={doc._id}>
            <Link key={doc._id} to={`/editor/${doc._id}`} className="document-item">
            {doc.title}
          </Link>
          <button className="share-button" onClick={()=>{
            navigator.clipboard.writeText(`https://unity-docs-lake.vercel.app/editor/${doc._id}`);
            alert("Link Copied to clipboard");
          }} >Share</button>
          </div>
        ))}
      </div>
      <ToastContainer autoClose={1000}/>
    </div>
  );
};

export default Dashboard;
