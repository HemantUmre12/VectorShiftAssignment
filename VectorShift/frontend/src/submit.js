import { useStore } from "./store";
import { shallow } from "zustand/shallow";

import styles from "./style/submit.module.css";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleClick = async () => {
    const nodesData = nodes.map((node) => ({ id: node.id }));
    const edgesData = edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    }));

    const data = { nodes: nodesData, edges: edgesData };

    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      const { num_nodes, num_edges, is_dag } = result.data;

      alert(
        `Pipeline Summary:\n\n` +
          `Number of nodes: ${num_nodes}\n` +
          `Number of edges: ${num_edges}\n` +
          `Is DAG: ${is_dag ? "Yes" : "No"}`
      );
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <button type="submit" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};
