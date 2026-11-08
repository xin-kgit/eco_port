from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
# for browser security to created protect users from malicious, while entering and clicking
from pydantic import BaseModel
app = FastAPI()

# enable a CORS so your frontend can communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/")
def read_root():
    return {"message": "Eco-Brutalist API is live!"}

@app.get("/api/portfolio-stats")
def get_portfolio_stats():
    return{
        "role": "MCA Student & Full-Stack Developer",
        "projects_completed": 12,
        "co2_saved": "450kg",
        "mascot_mood": "🐸 Thriving in the Forest Canopy"
    }

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str
@app.post("/api/contact")
def receive_contact(data: ContactMessage):
    print(f"New Message from {data.name} ({data.email}): {data.message}")
    return {"status": "success", "response": f"Thanks {data.name}, your message landed in the canopy!"}
