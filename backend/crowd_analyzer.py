def estimate_crowd(hour: int, category: str) -> str:
    evening = 18 <= hour <= 23
    lunch = 12 <= hour <= 14
    if evening:
        return "busy"
    if lunch and any(k in category for k in ["restaurant", "cafe", "food"]):
        return "moderate"
    return "low"
