# %% [markdown]
# # Movie Recommender using Content Based Algorimth

# %%
import numpy as np
import pandas as pd

# %%
movies = pd.read_csv('data/tmdb_5000_movies.csv')
credits = pd.read_csv('data/tmdb_5000_credits.csv')

# %%
movies.head(2)

# %%
movies.info()

# %%
movies.shape

# %%
credits.head()

# %%
credits.info()

# %%
credits.shape

# %%
# Merge the two dataset to one

movies = movies.merge(credits, on="title")

# %%
movies.head()

# %%
# after merging
movies.shape

# %%
# Keeping important columns for recommendation
movies = movies[['movie_id','title','overview','genres','keywords','cast','crew']]

# %%
movies.info()

# %%
movies.columns

# %% [markdown]
# ### - Expository Data Anlysis

# %%
# check missing values 
movies.isnull().sum()

# %%
#  drop the missing values since it is just 3
movies = movies.dropna()

# %%
# cross check
movies.isnull().sum()

# %%
# Check for duplicates
movies.duplicated().sum()

# %%
movies.head(2)

# %% [markdown]
# treat the columns with data inform of list/array to normal values "genres, keywords, cast, crew"

# %%
movies.iloc[0]['genres']

# %%
movies.iloc[0]['genres']

# %%
movies.iloc[0]['keywords']

# %%
import ast #for converting str to list

def convert_extract_name(text):
    names_arr = []
    # convert to object
    for i in ast.literal_eval(text):
        # extract name from the list
        names_arr.append(i['name']) 
    return names_arr

# %%
# we're getting same properties from "genres" and "keywords"
movies['genres'] = movies['genres'].apply(convert_extract_name)
movies['keywords'] = movies['keywords'].apply(convert_extract_name)

# %%
movies.head(2)

# %%
movies.iloc[0]['cast']

# %%
movies.iloc[0]['crew']

# %%
def covert_cast(text):
    arr = []
    count = 0
    for i in ast.literal_eval(text):
        if count < 3:
            arr.append(i["name"])
        count+=1
    return arr        

# %%
movies["cast"] = movies["cast"].apply(covert_cast)

# %%
movies.head(5)

# %%
# handle crew

movies.iloc[0]['crew']

# %%
def fetch_director(text):
    L = []
    for i in ast.literal_eval(text):
        if i['job'] == 'Director':
            L.append(i['name'])
            break
    return L

# %%
movies['crew'] = movies['crew'].apply(fetch_director)

# %%
movies.head(2)

# %%
# handle overview (converting to list)

movies.iloc[0]['overview']

# %%
movies['overview'] = movies['overview'].apply(lambda x:x.split())
movies.sample(4)

# %%
movies.iloc[0]['overview']

# %%
movies.head(2)

# %%
# treat space and convert to lowercase for uniformity

#  removing space 
'Sam Worthington'
'SamWorthington'

def remove_space(ls):
    L1 = []
    for i in ls:
        L1.append(i.replace(" ",""))
    return L1

# %%

movies['cast'] = movies['cast'].apply(remove_space)
movies['crew'] = movies['crew'].apply(remove_space)
movies['genres'] = movies['genres'].apply(remove_space)
movies['keywords'] = movies['keywords'].apply(remove_space)

# %%
movies.head(3)

# %%
# Concatinate "overview", "genres", "keywords", "cast" and "crew"
movies['tags'] = movies['overview'] + movies['genres'] + movies['keywords'] + movies['cast'] + movies['crew']

# %%
movies.head(2)

# %%
movies.iloc[0]['tags']

# %%
# droping those extra columns
movies_new = movies[['movie_id','title','tags']]

# %%
movies_new.head(5)

# %%
# Converting list to str
movies_new['tags'] = movies_new['tags'].apply(lambda x: " ".join(x))
movies_new.head()

# %%
movies_new.iloc[0]['tags']

# %%
# convert to lowercase
movies_new["tags"] = movies_new["tags"].apply(lambda x:x.lower())

# %%
movies_new.iloc[0]['tags']

# %% [markdown]
# ### Preparing dataset for model trainning
# 
# - Nltk : to process text 
# - CountVectorizer from scikit-learn
# 
# CountVectorizer creates a matrix in which each unique word is represented by a column of the matrix, and each text sample from the document is a row in the matrix. The value of each cell is nothing but the count of the word in that particular text sample

# %%
import nltk
from nltk.stem import PorterStemmer

# %%
ps = PorterStemmer()

# %%




# import these modules
from nltk.stem import WordNetLemmatizer
 
lemmatizer = WordNetLemmatizer()
 
import nltk
nltk.download('wordnet')


# %%
print("rocks :", lemmatizer.lemmatize("rocks"))
print("corpora :", lemmatizer.lemmatize("corpora"))

# %%
def lemme(text):
    T = []
    
    for i in text.split():
        # T.append(ps.stem(i))
        T.append(lemmatizer.lemmatize(i))
    
    return " ".join(T)

# %%
movies_new['tags'] = movies_new['tags'].apply(lemme)

# %%
movies_new.iloc[0]['tags']

# %%
from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(max_features=5000, stop_words="english")

# %%
vector = cv.fit_transform(movies_new["tags"]).toarray()

# %%
vector

# %%
vector.shape

# %%
vector[0]

# %%
from sklearn.metrics.pairwise import cosine_similarity

similarity = cosine_similarity(vector)

# %%
similarity.shape

# %%
movies_new[movies_new['title'] == 'The Lego Movie'].index[0]

# %%
movies_new[movies_new['title'] == "Spider-Man 2"]

# %%
movies_new

# %%
def recommender(movie_title):
    index = movies_new[movies_new['title'] == movie_title].index[0]
    print(index)
    recommed_movie_list = list()
    distances = sorted(list(enumerate(similarity[index])),reverse=True,key = lambda x: x[1])
    for i in distances[1:6]:
        recommed_movie_list.append(movies_new.iloc[i[0]].title)
        print("title", movies_new.iloc[i[0]].title)
        
    return recommed_movie_list    

# %%
res = recommender('Spider-Man 2')

# %%
res

# %%
for r in res:
    print(r)

# %%
import pickle as pk
with open("model/movie_list.pkl", "wb") as f_out:
    pk.dump(movies_new, f_out)

# %%
import pickle as pk

with open("model/similarity.pkl", "wb") as f_out:
    pk.dump(similarity, f_out)



