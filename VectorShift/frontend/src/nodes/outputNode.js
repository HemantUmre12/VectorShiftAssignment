import { Position } from "reactflow";
import NodeWrapper from "./nodeWrapper";
import { Icons } from "./nodeIcons";
import { useStore } from "../store.js";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setCurrName: (e) => store.updateNodeField(id, "outputName", e.target.value),
  setOutputType: (e) => store.updateNodeField(id, "outputType", e.target.value),
});

export const OutputNode = ({ id, data }) => {
  const { setCurrName, setOutputType } = useStore(selector(id), shallow);

  const handles = [
    { type: "target", position: Position.Left, id: `${id}-value` },
  ];

  return (
    <NodeWrapper
      id={id}
      handles={handles}
      name={"Output"}
      icon={Icons.customOutput}
    >
      <div>
        <label htmlFor="name">Name:</label>
        <input
          value={data.outputName}
          id="name"
          type="text"
          onChange={setCurrName}
        />
      </div>

      <div>
        <label htmlFor="comp">Type:</label>
        <select value={data.outputType} onChange={setOutputType} id="comp">
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </NodeWrapper>
  );
};
