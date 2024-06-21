// Sidebar.js
import React from 'react';

const Sidebar = ({ documents, onDocumentClick }) => {
  return (
    <aside>
      <h2>Documents</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id} onClick={() => onDocumentClick(doc.id)}>
            {doc.title}
          </li>
        ))}
      </ul>
      {/* Add a "New Document" button here */}
      <button >New Document</button>
    </aside>
  );
};

export default Sidebar;
