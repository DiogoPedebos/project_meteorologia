from pydantic import BaseModel
from datetime import date

class WeatherCreate(BaseModel):
    forecast_date: date
    min_temp: float
    max_temp: float
    weather_conditions: str
    wind_speed: float
    wind_direction: str
    precipitation_probability: float

    class Config:
        orm_mode = True
