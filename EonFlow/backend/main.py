from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI  # Importa la clase OpenAI
from dotenv import load_dotenv
import os

app = FastAPI()

# Configura CORS para permitir solicitudes desde tu frontend
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AIRequest(BaseModel):
    prompt: str

class AIResponse(BaseModel):
    response: str

# Inicializa el cliente de OpenAI
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
if not client.api_key:
    raise Exception("La variable de entorno OPENAI_API_KEY no está configurada.")

@app.post("/ask-ai", response_model=AIResponse)
async def ask_ai(request: AIRequest):
    try:
        chat_completion = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Elige el modelo que prefieras (ej: "gpt-4", "gpt-3.5-turbo")
            messages=[{"role": "user", "content": request.prompt}],
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.7,
        )
        ai_response = chat_completion.choices[0].message.content.strip()
        return {"response": ai_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)