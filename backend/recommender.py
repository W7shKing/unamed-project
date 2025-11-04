from typing import List, Dict, Any


def recommend(user_id: str, history: List[Dict[str, Any]]):
    # Simple demo recommender: return fixed list, could use history later
    base = [
        {"placeId": "dubai-mall", "title": "The Dubai Mall", "score": 0.95},
        {"placeId": "bluewaters", "title": "Bluewaters Island", "score": 0.92},
        {"placeId": "la-mer", "title": "La Mer", "score": 0.9},
    ]
    return base
