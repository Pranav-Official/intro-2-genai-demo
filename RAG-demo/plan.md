# Basic RAG Demo Plan

## Tech Stack
- **LLM**: Gemini via litellm (using GEMINI_API_KEY from .env)
- **Vector DB**: FAISS (cpu)
- **Orchestration**: LangGraph
- **Tracing**: LangSmith
- **Env**: python-dotenv
- **PDF**: pypdf

## Implementation Plan

### 1. Project Setup
- Create `.env` with GEMINI_API_KEY, LANGCHAIN_API_KEY
- Create `config.py` for environment configuration
- Install `pypdf` for PDF support

### 2. Document Processing
- Create `documents/` directory for source files
- Implement document loader (txt, md, pdf)
- Add text chunking with overlap
- Store chunks in FAISS

### 3. Vector Store
- Create `vector_store.py`
- Initialize FAISS index with embeddings (sentence-transformers)
- Implement add/query operations

### 4. LLM Setup
- Configure litellm for Gemini models
- Create `llm.py` wrapper

### 5. LangGraph Workflow
- Create `graph.py` with nodes:
  - `retrieve`: Fetch relevant chunks from FAISS
  - `generate`: Generate answer with retrieved context
- Define state schema and edges

### 6. Tracing
- Configure LangSmith client
- Add tracing to graph nodes

### 7. Main Application
- Create `app.py` or `main.py`
- CLI or simple API to query the RAG system

### 8. Testing & Demo
- Add sample documents (txt, md, pdf)
- Test end-to-end flow
