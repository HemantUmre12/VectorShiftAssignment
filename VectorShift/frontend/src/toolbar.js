import { DraggableNode } from "./draggableNode";
import { Icons } from "./nodes/nodeIcons";

import styles from "./style/toolbar.module.css";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div className={styles.container}>
        <DraggableNode
          type="customInput"
          label="Input"
          icon={Icons.customInput}
        />
        <DraggableNode type="llm" label="LLM" icon={Icons.llm} />
        <DraggableNode
          type="customOutput"
          label="Output"
          icon={Icons.customOutput}
        />
        <DraggableNode type="text" label="Text" icon={Icons.text} />

        {/* Extra nodes */}
        <DraggableNode type="pipeline" label="Pipeline" icon={Icons.pipeline} />
        <DraggableNode
          type="transform"
          label="Transform"
          icon={Icons.transform}
        />
        <DraggableNode type="note" label="Note" icon={Icons.note} />
        <DraggableNode
          type="knowledge"
          label="Knowledge"
          icon={Icons.knowledge}
        />
        <DraggableNode type="search" label="Search" icon={Icons.search} />
      </div>
    </div>
  );
};
