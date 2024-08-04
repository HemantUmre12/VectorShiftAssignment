import { Handle } from "reactflow";
import CrossIcon from "../icons/cross";
import styles from "../style/node.module.css";
import { useStore } from "../store.js";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  deleteNode: (id) => state.deleteNode(id),
});

const NodeWrapper = ({ id, children, handles, name, icon: Icon, width }) => {
  const { deleteNode } = useStore(selector, shallow);

  return (
    <div className={styles.container} style={{ width }}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.nodeType}>
          {Icon && <Icon />}
          <span className={styles.nodeTypeText}>{name}</span>
        </div>
        <div className={styles.flexGrow}></div>
        <div className={styles.crossIcon} onClick={() => deleteNode(id)}>
          <CrossIcon />
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>{children}</div>

      {/* Handles */}
      {handles &&
        handles.map(({ id, type, position, style }) => (
          <Handle
            key={id}
            type={type}
            position={position}
            id={id}
            style={style}
          />
        ))}
    </div>
  );
};

export default NodeWrapper;
