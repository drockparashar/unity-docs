import React, { useState, useCallback } from "react";
import { createEditor, Transforms, Element, Editor } from "slate"; // Import Editor and Element from Slate
import { Slate, Editable, withReact } from "slate-react";
import "../styles/editor.css";

import code from "../assets/code.svg";
import bold from "../assets/bold.svg";
import italic from "../assets/italic.svg";
import strikethrough from "../assets/strikethrough.svg";
import quote from "../assets/quote.svg";
import bullet from "../assets/bullet.svg";
import list from "../assets/list.svg";
import alignleft from "../assets/align-left.svg";
import alignright from "../assets/align-right.svg";
import aligncenter from "../assets/align-center.svg";
import alignjustify from "../assets/align-justify.svg";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

const renderElement = (props) => {
  switch (props.element.type) {
    case "code":
      return <CodeElement {...props} />;
    case "quote":
      return <QuoteElement {...props} />;
    case "bullet":
      return <BulletElement {...props} />;
    case "list":
      return <ListElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

const Editors = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const handleClick = (format) => () => {
    toggleMark(editor, format);
  };

  const handleChange = (format) => () => {
    const isActive = isBlockActive(editor, format);
    
    Transforms.setNodes(
      editor,
      { type: isActive ? 'paragraph' : format },
      { match: (n) => Editor.isBlock(editor, n) }
    );
    console.log("Editor nodes:", Array.from(Editor.nodes(editor)));
  };
  
  
  
  const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === format,
    });
  
    return !!match;
  };
  
  
  
  
  

  return (
    <div className="parent">
      <div className="hero">
        <div className="toolbar">
          <button className="tool" onClick={handleClick("bold")}>
            <img src={bold} alt="bold" />
          </button>
          <button className="tool" onClick={handleClick("italic")}>
            <img src={italic} alt="italic" />
          </button>
          <button className="tool" onClick={handleClick("strikethrough")}>
            <img src={strikethrough} alt="strikethrough"  />
          </button>
          <button className="tool" onClick={handleChange("code")}>
            <img src={code} alt="code" />
          </button>
          <button className="tool">
            <img src={quote} alt="quote" />
          </button>
          <button className="tool">
            <img src={bullet} alt="bullet" />
          </button>
          <button className="tool">
            <img src={list} alt="list" />
          </button>
          <button className="tool">
            <img src={alignleft} alt="align-left" />
          </button>
          <button className="tool">
            <img src={aligncenter} alt="align-center" />
          </button>
          <button className="tool">
            <img src={alignright} alt="align-right" />
          </button>
          <button className="tool">
            <img src={alignjustify} alt="align-justify" />
          </button>
        </div>
        <div className="slate">
          <Slate editor={editor} initialValue={initialValue}>
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={(e) => {
                if (!e.ctrlKey) {
                  return;
                }
                // Get the currently selected node
                const [node] = Editor.nodes(editor, {
                  match: (n) =>
                    Element.isElement(n) && Editor.isBlock(editor, n),
                });
                // Determine the type based on the current node's type
                const match = node && node[0].type === "paragraph";
                // Toggle between paragraph and code block types
                switch (e.key) {
                  case "`":
                    e.preventDefault();
                    Transforms.setNodes(editor, {
                      type: match ? "code" : "paragraph",
                    });
                    break;
                  //Ctrl+b for bold
                  case "b":
                    e.preventDefault();
                    toggleMark(editor, "bold");
                    break;

                  //Ctrl+b for italic
                  case "i":
                    e.preventDefault();
                    toggleMark(editor, "italic");
                    break;

                  //Ctrl+s for strikethrough
                  case "s":
                    e.preventDefault();
                    toggleMark(editor, "strikethrough");
                    break;

                  case "q":
                    e.preventDefault();
                    Transforms.setNodes(editor, {
                      type: match ? "quote" : "paragraph",
                    });
                    break;

                  case "u":
                    e.preventDefault();
                    Transforms.setNodes(editor, {
                      type: match ? "bullet" : "paragraph",
                    });
                    break;
                  case "m":
                    e.preventDefault();
                    Transforms.setNodes(editor, {
                      type: match ? "list" : "paragraph",
                    });
                    break;

                  case "l": // Ctrl + l for left alignment
                    e.preventDefault();
                    toggleAlign(editor, "left");
                    break;
                  case "r": // Ctrl + r for right alignment
                    e.preventDefault();
                    toggleAlign(editor, "right");
                    break;
                  case "e": // Ctrl + e for center alignment
                    e.preventDefault();
                    toggleAlign(editor, "center");
                    break;
                  case "j": // Ctrl + j for justify alignment
                    e.preventDefault();
                    toggleAlign(editor, "justify");
                    break;

                  default:
                    break;
                }
              }}
            />
          </Slate>
        </div>
      </div>
    </div>
  );
};

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const QuoteElement = (props) => {
  return (
    <span {...props.attributes} style={{ fontStyle: "italic" }}>
      "{props.children}"
    </span>
  );
};

const BulletElement = (props) => {
  return <li {...props.attributes}>{props.children}</li>;
};

const ListElement = (props) => {
  return (
    <ol>
      <li {...props.attributes}>{props.children}</li>
    </ol>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const toggleAlign = (editor, alignment) => {
  Transforms.setNodes(
    editor,
    { textAlign: alignment },
    { match: Text.isText, split: true }
  );
};

//update leaf element to include styles
const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecorationLine: props.leaf.strikethrough ? "line-through" : "none",
        textAlign: props.leaf.textAlign || "left",
      }}
    >
      {props.leaf.quote ? `"${props.children}"` : props.children}
    </span>
  );
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export default Editors;
