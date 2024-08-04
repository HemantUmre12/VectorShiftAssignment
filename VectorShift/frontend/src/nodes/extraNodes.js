import { Position } from "reactflow";
import NodeWrapper from "./nodeWrapper";
import { Icons } from "./nodeIcons";

export const PipelineNode = ({ id, data }) => {
  const handles = [
    { type: "source", position: Position.Right, id: `${id}-response` },
  ];

  return (
    <NodeWrapper
      id={id}
      handles={handles}
      name={"Pipeline"}
      icon={Icons.pipeline}
    >
      <div>
        <span>This is a Pipeline.</span>
      </div>
    </NodeWrapper>
  );
};

export const NoteNode = ({ id, data }) => {
  return (
    <NodeWrapper id={id} name={"Note"} icon={Icons.note}>
      <div>
        <span>This is a Note.</span>
      </div>
    </NodeWrapper>
  );
};

export const TransformNode = ({ id, data }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-system`,
    },
    { type: "source", position: Position.Right, id: `${id}-response` },
  ];

  return (
    <NodeWrapper
      id={id}
      handles={handles}
      name={"Transform"}
      icon={Icons.transform}
    >
      <div>
        <span>This is a Transform Node.</span>
      </div>
    </NodeWrapper>
  );
};

export const KnowledgeNode = ({ id, data }) => {
  const handles = [
    { type: "source", position: Position.Right, id: `${id}-response` },
  ];

  return (
    <NodeWrapper
      id={id}
      handles={handles}
      name={"Knowledge"}
      icon={Icons.knowledge}
    >
      <div>
        <span>This is a Knowledge Node.</span>
      </div>
    </NodeWrapper>
  );
};

export const SearchNode = ({ id, data }) => {
  const handles = [
    { type: "source", position: Position.Right, id: `${id}-response` },
  ];

  return (
    <NodeWrapper id={id} handles={handles} name={"Search"} icon={Icons.search}>
      <div>
        <span>This is a Search Node.</span>
      </div>
    </NodeWrapper>
  );
};
