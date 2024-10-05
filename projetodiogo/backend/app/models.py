from sqlalchemy import Column, Integer, Float, String, Date
from .database import Base

class WeatherForecast(Base):
    __tablename__ = 'weather_forecast'

    id = Column(Integer, primary_key=True, index=True)
    forecast_date = Column(Date)
    min_temp = Column(Float)
    max_temp = Column(Float)
    weather_conditions = Column(String)
    wind_speed = Column(Float)
    wind_direction = Column(String)
    precipitation_probability = Column(Float)