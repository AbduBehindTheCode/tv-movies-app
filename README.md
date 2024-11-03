# Movie & TV App

## Description

This application allows users to explore the top 10 rated TV shows and movies. With a simple, user-friendly interface, users can easily browse detailed information on each item and use a powerful search feature to find specific information.

## Features
* **Top 10 TV shows & Movies**: Quickly access lists of the top 10  rated TV shows and top 10 rated movies.
* **Detailed View:** Select any item from the list to open a detailed view, showcasing more details about the selected tv show or movie.
* **Search Functionality** Search feature enables users to find specific tv show or movie with a customizable minimum character limit for triggering results.
* **Configurable Default Tab**: Set the default tab (tv shows or movies) that displays when the application loads, providing a personalized experience.

* **High UX Design**: Designed with a user-first approach, the app features a clean, modern interface that ensures smooth navigation and interaction.
* **Responsive Design**: The application is fully responsive, offering a seamless experience on desktop, tablet, and mobile devices, adapting to any screen size.


## Technologies Used

* Angular v18.2
* Angular CLI v18.2
* Angular Material v18.2
* RxJS v7.8
* Eslint v9.13
* Prettier v3.3

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
