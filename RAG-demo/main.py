import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from vector_store import VectorStore
from graph import run_rag

load_dotenv()


def index_documents(documents_dir: str = "documents"):
    store = VectorStore()
    doc_path = Path(documents_dir)

    if not doc_path.exists():
        print(f"Directory {documents_dir} does not exist")
        return

    files = list(doc_path.glob("**/*"))
    files = [
        f for f in files if f.is_file() and f.suffix.lower() in [".txt", ".md", ".pdf"]
    ]

    if not files:
        print(f"No documents found in {documents_dir}")
        return

    print(f"Indexing {len(files)} documents...")
    store.add_documents([str(f) for f in files])
    print("Done indexing!")

    return store


def main():
    print("Initializing RAG system...")
    index_documents()

    print("\nAsk questions about your documents (type 'quit' to exit):")
    while True:
        question = input("\n> ")
        if question.lower() in ["quit", "exit", "q"]:
            break

        if not question.strip():
            continue

        print("Searching...")
        answer = run_rag(question)
        print(f"\n{answer}")


if __name__ == "__main__":
    main()
