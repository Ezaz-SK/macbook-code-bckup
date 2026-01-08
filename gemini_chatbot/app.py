# app.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration
CHROMA_PATH = "chroma_db"

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for simplicity
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize models
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0.5,
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

embeddings_model = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001",
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

# Connect to ChromaDB
vector_store = Chroma(
    embedding_function=embeddings_model,
    persist_directory=CHROMA_PATH
)
retriever = vector_store.as_retriever(search_kwargs={'k': 5})

# Pydantic model for the request body
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(request: ChatRequest):
    """
    Chat endpoint to handle user messages.
    """
    try:
        # 1. Retrieve relevant documents
        docs = retriever.invoke(request.message)
        knowledge = "\n\n".join([doc.page_content for doc in docs])

        # 2. Create the RAG prompt
        rag_prompt = f"""
        You are an assistant for question-answering tasks.
        Use the following pieces of retrieved context to answer the question.
        If you don't know the answer, just say that you don't know.
        Use three sentences maximum and keep the answer concise.

        Context: {knowledge}

        Question: {request.message}

        Helpful Answer:
        """

        # 3. Generate the response
        response = llm.invoke(rag_prompt)

        return {"answer": response.content}

    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": "Failed to process the request."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)