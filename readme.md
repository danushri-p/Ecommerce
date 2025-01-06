Ecommerce Application

Milestone 1: Project Overview

This project is a simple Ecommerce web application that includes core functionalities such as user authentication, product display, order management, and a payment gateway.

1. User Authentication: This is used for registration like log page

2. Product Page: This is used to displays the products

3. Order Page: This is used to show order details of each product

4. Payment Gateway:This is used to process the payment for the products ordered.

Milestone 2:

1.Setup Frontend:

1.Tailwind CSS(npm install -D tailwindcss)

React(npm create vite@latest frontend).
2.Set up the Backend

1.Initialization (npm init) This is for creating a package.json file which keeps track of all dependencies and metadata used by a project.

Installing packages express (npm i express ):Used for routing and handling the logic in a server.
mongoose(npm i mongoose):connect and interact with MongoDB, schema-based solution for data management.

cors (npm i cors):cross-origin requests are necessary for frontend-backend communications.

nodemon (npm i nodemon):automatically reboots the server on changing files, which makes further development more efficient.

After all these configurations, this project is ready for complete full-stack development.

Milestone 3:
1. Setting up the Node Server: You start by setting up a app.js server, usually with frameworks like Express

2. Connecting Your Application to MongoDB: MongoDB is a NoSQL database where you can store data in collections.

3. Establish Connection Between Database and Server: 

created a file name database.js and connected the database and server

MileStone-4:
1. User Model for the Database: a. The User Model represents the structure and schema for storing user data in the database. b. It defines what data should be stored, such as the user's name, email, password, and any other necessary information

2. Setting up Controllers to Handle User-Related Data: Controllers are responsible for handling the logic of how data is processed and returned in response to client requests.

3. Enabling File Uploads Using Multer: Multer is a middleware used for handling file uploads in a web application.

4. Error Handling: Error handling ensures that if something goes wrong, the system can report where the problem occurred.

Milestone 5: 

Creating the Signup page

  1. Developed the signup page for the e-commerce application.
   
  2. The page includes a form that allows users to input their name, email, and password.
   
  3. The form validates the inputs and submits the data to the backend for user registration.
   
  4. This feature is crucial for enabling new users to create accounts and start shopping on the platform.


Milestone 7:

Signup:

   1. Users provide their name, email, and password.


   2. Password is hashed before storing it in the database.

   3. If the user is already registered, they are asked to log in instead.

Login:

   1. Users log in with their email and password.


    
   2. Password is hashed before storing it in the database.
    
   3. If the user is already registered, they are asked to log in instead.
  
Login:

   1. Users log in with their email and password.
    

   2. If the credentials are correct, a token is generated and sent as a cookie.

Milestone 8:
   1. Displays a list of products using the Card component.

   2. Dummy data used for product titles.

   3. Each product is rendered with its title.

Components

   1. Card: Displays individual product titles.

   2. HomePage: Maps over dummy data and renders each Card.

Milestone 9:

   1. Form Creation: Collects fields like product name, price, and description.

   2. Data Submission: Captures input and sends it via an HTTP POST request to a backend server.

Milestone 10:

   1. Product Schema: Includes attributes such as product name, price, description, category, stock availability, and an image URL for storing product details.

   2. Data Submission Endpoint: Provides a /add-product API route for saving product information to the MongoDB database.

   3. Image Handling: Integrates Multer and Cloudinary to facilitate seamless product image uploads and storage

Milestone 11:

   1. writing an endpoint that will fetch data from DB.

   2. Writing an endpoint that will send all products data from DB to frontend

Milestone 12:

   1. Create a backend GET endpoint to send all products associated with a user's email to the frontend.

   2. Fetch the data on the frontend using a function.

   3.Dynamically display the data using a ProductCard component.


Happy coding!!
