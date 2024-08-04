import { Position } from "reactflow";
import NodeWrapper from "./nodeWrapper";
import { Icons } from "./nodeIcons";
import { useStore } from "../store.js";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setCurrName: (e) => store.updateNodeField(id, "inputName", e.target.value),
  setInputType: (e) => store.updateNodeField(id, "inputType", e.target.value),
});

export const InputNode = ({ id, data }) => {
  const { setCurrName, setInputType } = useStore(selector(id), shallow);

  const handles = [
    { type: "source", position: Position.Right, id: `${id}-value` },
  ];

  return (
    <NodeWrapper
      id={id}
      handles={handles}
      name={"Input"}
      icon={Icons.customInput}
    >
      <div>
        <label htmlFor="name">Name:</label>
        <input
          value={data.inputName}
          id="name"
          type="text"
          onChange={setCurrName}
        />
      </div>

      <div>
        <label htmlFor="comp">Type:</label>
        <select value={data.inputType} onChange={setInputType} id="comp">
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </NodeWrapper>
  );
};
