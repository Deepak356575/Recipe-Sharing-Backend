# Recipe Sharing Platform - Backend

## Overview
This is the backend of the Recipe Sharing Platform built with **Node.js, Express.js, and MongoDB**.

## Features
- User authentication with JWT
- CRUD operations for recipes
- Ratings and comments system
- User profiles with favorite recipes

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Multer for image uploads

API Endpoints

##User Routes
POST /signUp - Register a new user
POST /login - Login user
GET /user/:id - Get user profile

##Recipe Routes

GET /recipe - Get all recipes
GET /recipe/:id - Get a single recipe by ID
POST /recipe - Add a new recipe (requires authentication)
PUT /recipe/:id - Edit a recipe
DELETE /recipe/:id - Delete a recipe
