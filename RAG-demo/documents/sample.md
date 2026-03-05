# Sample Document

## Introduction to RAG

Retrieval-Augmented Generation (RAG) is a technique that enhances LLM responses by retrieving relevant information from a knowledge base.

## Benefits of RAG

1. **Accurate responses** - Grounded in real data
2. **Up-to-date information** - Can use fresh documents
3. **Source citation** - Can reference where info came from
4. **Reduced hallucinations** - Less likely to make things up

## How it works

1. Load and chunk documents
2. Create embeddings using a model
3. Store embeddings in a vector database
4. On query, retrieve similar chunks
5. Pass context to LLM for generation
