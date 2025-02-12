# Movie & TV Shows App (Frontend)

## Technologies Used

- Angular v18.2
- Angular CLI v18.2
- Angular Material v18.2
- RxJS v7.8
- Eslint v9.13
- Prettier v3.3

## Prerequisites

This project uses **[TheMovieDB (TMDB) API](https://developer.themoviedb.org/docs/getting-started)**.  
To access the API, you’ll need to create an account on TMDB and generate a JSON Web Token (JWT) for authentication.

1. **Register**: Go to [API Provider's Website](https://www.themoviedb.org/login) to create an account.
2. **Generate a JWT**: Follow the documentation on the website to generate a JWT for API access.
3. **Add the JWT to Configuration**: Use this JWT as described in the configuration step below.

## Installation

1. **Clone the repository to your local machine**:

```mark
git clone https://github.com/AbduBehindTheCode/tv-movies-app.git
```

2. **Navigate to the project directory**:

```mark
cd tv-movies-app
```

3. **Install the dependencies**:

```mark
npm install
```

4. **Set up configuration**:

- Navigate to the `/src/config` directory.
- Make a copy of `config.local.template` and rename it to `config.local.ts`.
- Open `config.local.ts` and replace "ADD_YOUR_TOKEN_HERE" with your actual token.

5. **Run the application**:

```mark
ng serve
```

### ⚠️  Disabling the Recommendation Feature
If you prefer not to use the recommendation feature, you can disable it by setting the following configuration:

Steps to disable recommendations:

1. **Open the configuration file**: `src/config/config.global.ts`
2. **Set enableRecommender to false:**
```mark
export const enableRecommender = false;
```

When disabled, setting up the **recommender-api** project is not required.

This allows you to run the application without the recommendation system.


## Feedback & Issue Reporting
If you encounter any issues during installation, notice missing steps in the setup guide, or find bugs in the application, please report them so we can improve the project.

📌 **Where to report issues**:
- Open an issue on the project's GitHub repository: [GitHub Issues](https://github.com/AbduBehindTheCode/tv-movies-app/issues)

Your feedback helps make this project better! 🚀


