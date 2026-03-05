import sys
from graph import run_rag


def main():
    if len(sys.argv) < 2:
        print('Usage: python answer.py "Your question here"')
        sys.exit(1)

    question = " ".join(sys.argv[1:])
    print(f"Question: {question}\n")

    answer = run_rag(question)
    print(f"Answer: {answer}")


if __name__ == "__main__":
    main()
