# ingest.py
import os
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
DATA_PATH = "data"
CHROMA_PATH = "chroma_db"

def main():
    """
    Main function to load, split, and ingest documents into ChromaDB.
    """
    print("Starting document ingestion process...")

    # 1. Load Documents
    print(f"Loading documents from '{DATA_PATH}'...")
    loader = PyPDFDirectoryLoader(DATA_PATH)
    documents = loader.load()
    if not documents:
        print("No documents found. Please add PDF files to the 'data' directory.")
        return
    print(f"Loaded {len(documents)} document(s).")

    # 2. Split Documents into Chunks
    print("Splitting documents into chunks...")
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100,
        length_function=len
    )
    chunks = text_splitter.split_documents(documents)
    print(f"Created {len(chunks)} chunks of text.")

    # 3. Initialize Embeddings Model
    print("Initializing embeddings model...")
    embeddings_model = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=os.getenv("GOOGLE_API_KEY")
    )

    # 4. Create and Persist ChromaDB
    print(f"Creating and persisting ChromaDB at '{CHROMA_PATH}'...")
    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings_model,
        persist_directory=CHROMA_PATH
    )

    print("Document ingestion complete!")

if __name__ == "__main__":
    main()