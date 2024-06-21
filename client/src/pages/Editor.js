import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import '../styles/editor.css';
import { io } from 'socket.io-client';
import {useParams} from "react-router-dom";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ['link', 'image'],
  ['clean']
];

const Editor = () => {
  const [socket, setSocket] = useState(null);
  const quillRef = useRef(null);
  const [value, setValue] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const {_id}=useParams();

  useEffect(()=>{
    if(socket==null) return;

    socket.emit('get', { _id });
    socket.once('get', (content) => {
      console.log('Initial content:', content);
      setLoading(false)
      setValue(content);
    });

  },[socket,_id])

  useEffect(() => {
    const s = io('http://localhost:3001');
    setSocket(s);

    // Fetch initial document content
    // s.emit('get', { _id: '667164f1b5d1615a7f4fa0d8' });
    // s.on('get', (content) => {
    //   console.log('Initial content:', content);
    //   setValue(content);
    // });

    // Listen for content updates
    s.on('updateContent', (delta) => {
      console.log('Broadcast received:', delta);
      if (quillRef.current) {
        const quill = quillRef.current.getEditor();
        quill.updateContents(delta);
      }
    });

    // Cleanup on component unmount
    return () => {
      s.disconnect();
    };
  }, []);

  const handleChange = (content, delta, source, editor) => {
    console.log('Delta:', delta);
    setValue(content);

    if (!socket || source !== 'user') return;

    socket.emit('update', { _id, delta ,content});
    console.log("Brodcast emitted",delta)
  };

  return (
   <div id='editorJs'>
     <ReactQuill
      ref={quillRef}
      theme='snow'
      value={value}
      modules={{ toolbar: TOOLBAR_OPTIONS }}
      onChange={handleChange}
      readOnly={loading}
    />
   </div>
  );
};

export default Editor;
