import pickle
import requests
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# Load the model and similarity matrix
movies = pickle.load(open('model/movie_list.pkl', 'rb'))
similarity = pickle.load(open('model/similarity.pkl', 'rb'))

# API Key for TMDb
load_dotenv()
api_key = os.getenv("API_KEY")

app = FastAPI()

class MovieRequest(BaseModel):
    movie: str

def fetch_poster(movie_id):
    """Fetch movie poster URL from TMDb API."""
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US"
    data = requests.get(url).json()
    poster_path = data.get('poster_path', '')  # Handle missing posters
    return f"https://image.tmdb.org/t/p/w500/{poster_path}" if poster_path else None

def recommend(movie):
    """Find similar movies based on the given title."""
    if movie not in movies['title'].values:
        return {"error": "Movie not found in dataset"}

    index = movies[movies['title'] == movie].index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])

    recommendations = []
    for i in distances[1:6]:  # Get top 5 recommendations
        movie_id = movies.iloc[i[0]].movie_id
        movie_title = movies.iloc[i[0]].title
        movie_poster = fetch_poster(movie_id)

        recommendations.append({
            "title": movie_title,
            "movie_id": int(movie_id),
            "poster_url": movie_poster
        })

    return recommendations

@app.post("/recommend")
def get_recommendations(request: MovieRequest):
    """API Endpoint: Accepts a movie title and returns recommendations."""
    return recommend(request.movie)
