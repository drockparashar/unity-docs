import React, { useState, useCallback } from "react";
import { createEditor, Transforms, Element, Editor } from "slate"; // Import Editor and Element from Slate
import { Slate, Editable, withReact } from "slate-react";
import "../styles/editor.css";

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
    default:
      return <DefaultElement {...props} />;
  }
};

const Editors = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  return (
    <div className="parent">
      <div className="hero">
        <Slate editor={editor} initialValue={initialValue}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={(e) => {
              if (!e.ctrlKey) {
                return;
              }
              switch (e.key) {
                case "`":
                  e.preventDefault();
                  // Get the currently selected node
                  const [node] = Editor.nodes(editor, {
                    match: (n) =>
                      Element.isElement(n) && Editor.isBlock(editor, n),
                  });
                  // Determine the type based on the current node's type
                  const match = node && node[0].type === "paragraph";
                  // Toggle between paragraph and code block types
                  Transforms.setNodes(editor, {
                    type: match ? "code" : "paragraph",
                  });
                  break;

                case "b":
                  e.preventDefault();
                  const isBold = !!Editor.marks(editor)?.bold;
                  // Toggle bold mark
                  Editor.addMark(editor, "bold", !isBold);
                  break;

                default:
                  break;
              }
            }}
          />
        </Slate>
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

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}

export default Editors;
