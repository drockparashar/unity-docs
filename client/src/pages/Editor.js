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

  return (
    <div className="parent">
      <div className="hero">
        <div className="toolbar">
          <button className="tool">
          <img src={bold}  alt="bold"/>
          </button>
          <button className="tool">
          <img src={italic}  alt="italic"/>
          </button>
          <button className="tool">
          <img src={strikethrough}  alt="strikethrough"/>
          </button>
          <button className="tool">
          <img src={code}  alt="code"/>
          </button>
          <select className="tool">
            <option>Font 1</option>
            <option>Font 2</option>
            <option>Font 3</option>
          </select>
          <button className="tool">
          <img src={quote}  alt="quote"/>
          </button>
          <button className="tool"> 
            <img src={bullet}  alt="bullet"/>
          </button>
          <button className="tool">
          <img src={list}  alt="list"/>
          </button>
          <button className="tool">
          <img src={alignleft}  alt="align-left"/>
          </button>
          <button className="tool">
          <img src={aligncenter}  alt="align-center"/>
          </button>
          <button className="tool">
          <img src={alignright}  alt="align-right"/>
          </button>
          <button className="tool">
          <img src={alignjustify}  alt="align-justify"/>
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
                  case "l":
                    e.preventDefault();
                    Transforms.setNodes(editor, {
                      type: match ? "list" : "paragraph",
                    });
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

//update leaf element to include styles
const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecorationLine: props.leaf.strikethrough ? "line-through" : "none",
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