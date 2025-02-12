# Movie & TV Shows App (Recommender API)

## Technologies Used

- Python 3.10
- pip 25.0.1

## Prerequisites

Before setting up the project, ensure you have the following:
- Python 3.10 and pip 25.0.1 installed.
- A TMDB API Key for accessing movie and TV show data.
- The TMDB Movie Metadata Dataset, which is used to train the recommendation model.

***Register for TMDB API Access***:
- **Register**: Go to [API Provider's Website](https://www.themoviedb.org/login) to create an account.
- **Generate a JWT**: Follow the documentation on the website to generate a JWT for API access.
- **Add the JWT to Configuration**: Use this JWT as described in the configuration step below.

***Download the Movie Dataset***:
- **Download**: Get the dataset from [Kaggle](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata?resource=download).
- **Usage**: These files will be used in a later step, just after the installation section.


## Installation

1. **Clone the repository to your local machine**:

```mark
git clone https://github.com/AbduBehindTheCode/tv-movies-app.git
```

2. **Navigate to the project directory**:

```mark
cd tv-movies-app/recommender-api
```

3. **Install the dependencies**:

```mark
pip install -r dependencies.txt
```

4. **Create folder named "data" in the root project directory**:
```mark
mkdir data
```

5. **Place the 2 downloaded files in the data folder**
 
6. **Create a virtual environment**:
```mark
python -m venv venv
```

7. **activate the virtual environment**:
```mark
source venv/bin/activate
```

8. **Run the train model script**:
```mark
python scripts/train_model_script.py
```

9. **Create a `.env` file in your project root and add the genrate key from TheMovieDB (TMDB) API**:
```mark
API_KEY=your-secret-api-key
```

10. **Install python-dotenv package**
```mark
pip install python-dotenv
```

11. **Install fastapi && uvicorn**
```mark
 pip install fastapi uvicorn
```

12. **To run the API, run:**:
```mark
uvicorn api:app --reload
```

13. **If you want to run the app on streamlit, run (optional)**:
```mark
run "streamlit run app.py
```


## Feedback & Issue Reporting
If you encounter any issues during installation, notice missing steps in the setup guide, or find bugs in the application, please report them so we can improve the project.

📌 **Where to report issues**:
- Open an issue on the project's GitHub repository: [GitHub Issues](https://github.com/AbduBehindTheCode/tv-movies-app/issues)

Your feedback helps make this project better! 🚀


