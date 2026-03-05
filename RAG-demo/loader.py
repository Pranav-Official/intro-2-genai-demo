import os
from pathlib import Path
from pypdf import PdfReader
from config import CHUNK_SIZE, CHUNK_OVERLAP


def load_document(file_path: str) -> str:
    path = Path(file_path)
    ext = path.suffix.lower()

    if ext == ".pdf":
        return _load_pdf(file_path)
    elif ext in [".txt", ".md"]:
        return _load_text(file_path)
    else:
        raise ValueError(f"Unsupported file type: {ext}")


def _load_pdf(file_path: str) -> str:
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text


def _load_text(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()


def chunk_text(text: str) -> list[str]:
    words = text.split()
    chunks = []

    for i in range(0, len(words), CHUNK_SIZE - CHUNK_OVERLAP):
        chunk = " ".join(words[i : i + CHUNK_SIZE])
        if chunk:
            chunks.append(chunk)

    return chunks


def load_and_chunk(file_path: str) -> list[str]:
    text = load_document(file_path)
    return chunk_text(text)
