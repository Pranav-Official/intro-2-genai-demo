import litellm
from langsmith import traceable
from config import MODEL_NAME


@traceable
def generate_response(context: str, question: str) -> str:
    prompt = f"""Based on the following context, answer the question.

Context:
{context}

Question: {question}

Answer:"""

    response = litellm.completion(
        model=MODEL_NAME, messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content
