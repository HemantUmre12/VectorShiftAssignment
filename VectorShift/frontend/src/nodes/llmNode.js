import { Position } from "reactflow";
import NodeWrapper from "./nodeWrapper";
import { Icons } from "./nodeIcons";

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-system`,
      style: { top: "33%" },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: "66%" },
    },
    { type: "source", position: Position.Right, id: `${id}-response` },
  ];

  return (
    <NodeWrapper id={id} handles={handles} name={"LLM"} icon={Icons.llm}>
      <div>
        <span>This is a LLM.</span>
      </div>
    </NodeWrapper>
  );
};
