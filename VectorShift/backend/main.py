from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict, deque

app = FastAPI()

# CORS configuration
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NodeData(BaseModel):
    id: str


class EdgeData(BaseModel):
    id: str
    source: str
    target: str


class Pipeline(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


def build_graph(nodes: List[NodeData], edges: List[EdgeData]) -> (dict, dict):
    adj_list = defaultdict(list)
    in_degree = defaultdict(int)

    # Initialize the graph
    for node in nodes:
        in_degree[node.id] = 0

    for edge in edges:
        adj_list[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    return adj_list, in_degree


def topological_sort(
    nodes: List[NodeData], edges: List[EdgeData]
) -> Optional[List[str]]:
    adj_list, in_degree = build_graph(nodes, edges)

    # Queue for nodes with no incoming edges
    queue = deque([node.id for node in nodes if in_degree[node.id] == 0])
    topological_order = []

    while queue:
        node = queue.popleft()
        topological_order.append(node)

        for neighbor in adj_list[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If topological_order contains all nodes, then it's a DAG
    return topological_order if len(topological_order) == len(nodes) else None


def is_dag(nodes: List[NodeData], edges: List[EdgeData]) -> bool:
    # Check if the graph is a Directed Acyclic Graph (DAG).
    return topological_sort(nodes, edges) is not None


@app.post("/pipelines/parse/")
def parse_pipeline(pipeline: Pipeline):
    # Parse the pipeline to return the number of nodes, number of edges,
    # and whether the graph is a DAG.
    result = {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_dag(pipeline.nodes, pipeline.edges),
    }

    return {"status": "success", "data": result}
