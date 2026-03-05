from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
from langsmith import traceable
import config
from vector_store import VectorStore
from llm import generate_response


class GraphState(TypedDict):
    question: str
    context: str
    answer: str


@traceable
def retrieve(state: GraphState) -> dict:
    store = VectorStore()
    results = store.query(state["question"])
    context = "\n\n".join([r[0] for r in results])
    return {"context": context}


@traceable
def generate(state: GraphState) -> dict:
    answer = generate_response(state["context"], state["question"])
    return {"answer": answer}


def build_graph():
    graph = StateGraph(GraphState)

    graph.add_node("retrieve", retrieve)
    graph.add_node("generate", generate)

    graph.set_entry_point("retrieve")
    graph.add_edge("retrieve", "generate")
    graph.add_edge("generate", END)

    return graph.compile()


def run_rag(question: str) -> str:
    graph = build_graph()
    result = graph.invoke({"question": question, "context": "", "answer": ""})
    return result["answer"]
