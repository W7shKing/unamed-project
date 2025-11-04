from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
from recommender import recommend
from crowd_analyzer import estimate_crowd

app = FastAPI(title="Jadwalni AI Service")

class HistoryItem(BaseModel):
    placeId: str
    ts: int

class RecommendInput(BaseModel):
    userId: str
    history: List[HistoryItem] | None = None

@app.get("/")
async def root():
    return {"ok": True, "service": "jadwalni-ai"}

@app.post("/recommend")
async def recommend_endpoint(payload: RecommendInput):
    results = recommend(payload.userId, payload.history or [])
    return results

@app.get("/crowd-analyzer")
async def crowd_endpoint(hour: int = 20, category: str = "restaurant"):
    return {"level": estimate_crowd(hour, category)}

@app.get("/trending")
async def trending_endpoint():
    # Placeholder until Firestore data is connected
    return [
        {"placeId": "dubai-mall", "title": "The Dubai Mall", "score": 0.95},
        {"placeId": "jbr", "title": "JBR Beach", "score": 0.91},
        {"placeId": "city-walk", "title": "City Walk", "score": 0.88},
    ]
