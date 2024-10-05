from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .database import engine, get_db
from .models import Base, WeatherForecast
from .schemas import WeatherCreate
import requests
import os
from datetime import datetime

Base.metadata.create_all(bind=engine)

app = FastAPI()

API_KEY = os.getenv('METEOBLUE_API_KEY')

# Função para consumir a API da Meteoblue
def fetch_weather_data(city: str):
    url = f"http://my.meteoblue.com/packages/basic-day?apikey={API_KEY}&city={city}&format=json"
    response = requests.get(url)
    data = response.json()
    return data

# Endpoint para buscar a previsão do tempo e salvar no banco de dados
@app.post("/weather/{city}")
def get_weather(city: str, db: Session = Depends(get_db)):
    data = fetch_weather_data(city)
    
    for forecast in data["daily"]:
        weather_data = WeatherCreate(
            forecast_date=datetime.strptime(forecast["date"], '%Y-%m-%d').date(),
            min_temp=forecast["temp_min"],
            max_temp=forecast["temp_max"],
            weather_conditions=forecast["conditions"],
            wind_speed=forecast["wind_speed"],
            wind_direction=forecast["wind_direction"],
            precipitation_probability=forecast["precipitation_probability"]
        )
        
        db_weather = WeatherForecast(**weather_data.dict())
        db.add(db_weather)
        db.commit()
        db.refresh(db_weather)
    
    return {"message": f"Weather data for {city} saved successfully"}

# Endpoint para obter os dados da previsão salvos no banco de dados
@app.get("/weather/report")
def get_weather_report(db: Session = Depends(get_db)):
    return db.query(WeatherForecast).all()
