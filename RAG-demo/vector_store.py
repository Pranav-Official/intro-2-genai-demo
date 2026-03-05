import faiss
import numpy as np
import pickle
import logging
from pathlib import Path
from sentence_transformers import SentenceTransformer
from config import EMBEDDING_MODEL, TOP_K
from loader import load_and_chunk

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


class VectorStore:
    _instance = None
    _initialized = False

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        if VectorStore._initialized:
            return
        self.index = None
        self.chunks = []
        self.dimension = None
        self.model = SentenceTransformer(EMBEDDING_MODEL)
        self._load()
        VectorStore._initialized = True

    def _get_embedding(self, text: str) -> np.ndarray:
        return self.model.encode(text, convert_to_numpy=True)

    def add_documents(self, file_paths: list[str]):
        all_chunks = []
        for path in file_paths:
            chunks = load_and_chunk(path)
            all_chunks.extend(chunks)

        if not all_chunks:
            return

        logger.info(f"Loaded {len(all_chunks)} chunks, creating embeddings...")

        embed = self._get_embedding(all_chunks[0])
        self.dimension = len(embed)
        self.index = faiss.IndexFlatL2(self.dimension)
        self.index.add(embed.reshape(1, -1))
        self.chunks = all_chunks

        for i, chunk in enumerate(all_chunks[1:], start=1):
            emb = self._get_embedding(chunk)
            self.index.add(emb.reshape(1, -1))
            if i % 10 == 0 or i == len(all_chunks) - 1:
                logger.info(f"Embedded chunk {i + 1}/{len(all_chunks)}")

        logger.info(f"Successfully embedded {len(all_chunks)} chunks")
        self._save()

    def query(self, query_text: str, k: int = TOP_K) -> list[tuple[str, float]]:
        if self.index is None:
            return []
        query_emb = self._get_embedding(query_text).reshape(1, -1)
        distances, indices = self.index.search(query_emb, min(k, len(self.chunks)))

        results = []
        for dist, idx in zip(distances[0], indices[0]):
            if idx < len(self.chunks):
                results.append((self.chunks[idx], float(dist)))
        return results

    def _save(self):
        if self.index is not None:
            faiss.write_index(self.index, "data/faiss.index")
            with open("data/chunks.pkl", "wb") as f:
                pickle.dump(self.chunks, f)

    def _load(self):
        index_path = Path("data/faiss.index")
        chunks_path = Path("data/chunks.pkl")

        if index_path.exists() and chunks_path.exists():
            self.index = faiss.read_index(str(index_path))
            with open(chunks_path, "rb") as f:
                self.chunks = pickle.load(f)
            if self.chunks:
                embed = self._get_embedding(self.chunks[0])
                self.dimension = len(embed)
