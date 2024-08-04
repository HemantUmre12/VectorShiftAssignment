import { Position, useUpdateNodeInternals } from "reactflow";
import NodeWrapper from "./nodeWrapper";
import { shallow } from "zustand/shallow";
import { useStore } from "../store";
import { useMemo, useEffect } from "react";
import { Icons } from "./nodeIcons";
import styles from "../style/node.module.css";

const selector = (id) => (store) => ({
  setCurrText: (e) => store.updateNodeField(id, "text", e.target.value),
});

// Function to extract valid variables from the text
const getValidVariables = (text) => {
  const variables = new Set();
  let hasInvalidVariable = false;
  let pos = 0;

  // Regular expression for a valid JavaScript identifier
  const validIdentifierRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

  while (pos < text.length) {
    const st = text.indexOf("{{", pos);
    const end = text.indexOf("}}", pos);

    if (st === -1 || end === -1) {
      break;
    }

    // Trim to remove any leading/trailing spaces
    const v = text.substring(st + 2, end).trim();
    pos = end + 2;

    // Check if the variable is valid js variable
    if (!validIdentifierRegex.test(v)) {
      hasInvalidVariable = true;
      continue;
    }

    variables.add(v);
  }

  return {
    variables: Array.from(variables),
    hasInvalidVariable,
  };
};

export const TextNode = ({ id, data }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const { setCurrText } = useStore(selector(id), shallow);

  const { variables, hasInvalidVariable } = useMemo(
    () => getValidVariables(data.text),
    [data.text]
  );

  // Calculate gap for positioning handles
  const gap = Math.floor(100 / (variables.length + 1));

  const handles = useMemo(
    () => [
      { type: "source", position: Position.Right, id: `${id}-output` },
      ...variables.map((variable, idx) => ({
        type: "target",
        position: Position.Left,
        id: `${id}-${variable}`,
        style: { top: `${gap * (idx + 1)}%` },
      })),
    ],
    [variables, id, gap]
  );

  useEffect(() => {
    updateNodeInternals(id);
  }, [handles, id, updateNodeInternals]);

  // Adjust textarea height based on content
  const handleKeyDown = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <NodeWrapper
      id={id}
      handles={handles}
      name={"Text"}
      icon={Icons.text}
      width="250px"
    >
      <div>
        <label htmlFor="text-input">Text:</label>
        <textarea
          type="text"
          id="text-input"
          value={data.text}
          onChange={setCurrText}
          onKeyDown={handleKeyDown}
          className="nodrag"
        ></textarea>
        {hasInvalidVariable && (
          <div className={styles.errorNote}>
            Invalid syntax: Variable names must only include numbers, letters,
            and underscores and cannot start with numbers.
          </div>
        )}
      </div>
    </NodeWrapper>
  );
};
