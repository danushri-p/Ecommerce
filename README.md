# Ecommerce Application

## Milestone 1: Project Overview

This project is a simple Ecommerce web application that includes core functionalities such as user authentication, product display, order management, and a payment gateway.

1. User Authentication: This is used for registration like log page

2. Product Page: This is used to displays the products

3. Order Page: This is used to show order details of each product

4. Payment Gateway:This is used to process the payment for the products ordered.

## Milestone 2:

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

## Milestone 3:

1. Setting up the Node Server: You start by setting up a app.js server, usually with frameworks like Express

2. Connecting Your Application to MongoDB: MongoDB is a NoSQL database where you can store data in collections.

3. Establish Connection Between Database and Server:

created a file name database.js and connected the database and server

## MileStone-4:

1. User Model for the Database:
   
   a. The User Model represents the structure and schema for storing user data in the database.
   
   b. It defines what data should be stored, such as the user's name, email, password, and any other necessary information
  
3. Setting up Controllers to Handle User-Related Data: Controllers are responsible for handling the logic of how data is processed and returned in response to client requests.

4. Enabling File Uploads Using Multer: Multer is a middleware used for handling file uploads in a web application.

5. Error Handling: Error handling ensures that if something goes wrong, the system can report where the problem occurred.

## Milestone 5: 

Creating the Signup page

  1. Developed the signup page for the e-commerce application.
   
  2. The page includes a form that allows users to input their name, email, and password.
   
  3. The form validates the inputs and submits the data to the backend for user registration.
   
  4. This feature is crucial for enabling new users to create accounts and start shopping on the platform.

## Milestone 7:

Signup:

  1. Users provide their name, email, and password.

  2. Password is hashed before storing it in the database.

  3. If the user is already registered, they are asked to log in instead.
     
  
Login:

  1. Users log in with their email and password.

  2. If the credentials are correct, a token is generated and sent as a cookie.
    
## Milestone 8:

  1. Displays a list of products using the Card component.
    
  2. Dummy data used for product titles.
   
  3. Each product is rendered with its title.
     
Components

  1. Card: Displays individual product titles.
   
  2. HomePage: Maps over dummy data and renders each Card.

## Milestone 9:

  1. Form Creation: Collects fields like product name, price, and description.

  2. Data Submission: Captures input and sends it via an HTTP POST request to a backend server.

## Milestone 10:

   1. Product Schema: Includes attributes such as product name, price, description, category, stock availability, and an image URL for storing product details.
   
   2. Data Submission Endpoint: Provides a /add-product API route for saving product information to the MongoDB database.

   3. Image Handling: Integrates Multer and Cloudinary to facilitate seamless product image uploads and storage

## Milestone 11:

   1. writing an endpoint that will fetch data from DB.
   
   2. Writing an endpoint that will send all products data from DB to frontend

## Milestone 12:

   1. Create a backend GET endpoint to send all products associated with a user's email to the frontend.
    
   2. Fetch the data on the frontend using a function.

   3.Dynamically display the data using a ProductCard component.
   
## Milestone 13:

Backend:

   1. Create a PUT Route for Updating Data:

      a. Define a new route in your backend to handle PUT requests for updating existing records.
      
      b. Ensure the route accepts the necessary parameters to identify the record and the updated data.
      
      c. Validate the incoming data to maintain data integrity.
      
      d. Update the record in the database with the new data.
      
      e. Return an appropriate response indicating the success or failure of the operation.

Frontend:

   1. Create a Page for Auto-Filling Updated Data:
      a. Develop a page that retrieves the current data of the record to be updated.
      
      b. Use the record's unique identifier (e.g., id) to fetch the existing data from the backend.
      
      c. Populate the input fields with the fetched data, allowing the user to modify the necessary fields.
      
      d. Implement form validation to ensure the updated data is valid before submission.
      
      e. Provide a submit button that sends the updated data to the backend via the PUT route.
      
      f. Handle the response from the backend to inform the user of the success or failure of the update operation.

## Milestone 14:

Backend:

   1. Create a DELETE Route:
      a. Define a new route in your backend to handle DELETE requests for removing records.
      
      b. Ensure the route accepts the necessary parameters to identify the record to be deleted.
      
      c. Validate the request to confirm the record exists before attempting deletion.
      
      d. Remove the record from the database.
      
      e. Return an appropriate response indicating the success or failure of the deletion operation.
      
Frontend:

   1. Add a Delete Button:
      a. Include a delete button on the page displaying the record.
      
      b. Attach an event listener to the delete button that triggers a confirmation prompt to prevent accidental deletions.
      
      c. If the user confirms the deletion, send a request to the backend's DELETE route to remove the record.
      
      d. Handle the response from the backend to inform the user of the success or failure of the deletion operation.
      
      e. Optionally, update the UI to reflect the removal of the record without requiring a page reload.

## Milestone 15:
   
   1. Navbar Component: A fully mobile-responsive navigation bar with a dropdown menu.

      a. The navbar adapts to smaller screen sizes and provides a seamless navigation experience on mobile devices.

## Milestone 16:
   1. Single Page Product Details: A dedicated page to view product details.

      a. Users can see detailed information about products such as images, descriptions, and other specifications.
      
   3. Image Modal Component: A component that allows users to view product images in a larger modal view.
      
      b. Clicking on an image opens a modal with a larger version of the image.

## Milestone 17:

   1. Cart Schema: Defines the structure for storing cart items in the database.

   2. Cart Routes: API endpoints to manage cart operations.

   3. Cart Controller: Implements getCart and addToCart functions.

## Milestone 18:

   1. Get Cart Data Route

      In this we have been focusing on implementing the API endpoint for fetching cart data.
      
      The goal is to retrieve cart information stored in the backend for a given user.

## Milestone 19:
   1. This project implements a shopping cart where users can:

      View products added to their cart.

      Increase or decrease product quantity using + and - buttons.

      Backend support for updating the quantity of products.

## Milestone 20:
   1. This project implements a user profile page where users can:

      a. View their profile photo, name, and email.

      b. View their saved addresses.

      c. Add a new address if none exist.

## Milestone 21:
   1. Created Address Form Page

   2. Implemented State to Store Input Address

   3. Navigates to Address Form on 'Add Address' Click

## Milestone 22:

   1. Create a POST endpoint in your backend that will accept the user's address details from the frontend.
   
   2. Validate the address data to ensure all required fields are included.
   
   3. Add the address to the user's address array in the MongoDB user collection.

## Milestone 23:

   1. Cart Page with Place Order Button: A button to place an order, which navigates to the address selection page.

   2. Select Address Page: Displays all the available addresses and allows users to select one.
   
   3. Backend Endpoint for User Addresses: An API endpoint to retrieve the list of addresses associated with a user.

## Milestone 24:

   1. Cart Page: Displays all the products the user has added to the cart, the selected delivery address, and the total value of the cart.

   2. Address Selection: Allows the user to select a delivery address for their order.

   3. Place Order Button: A button to confirm the order and proceed to the final order placement.

## Milestone 25:

   1. User Authentication: Used for registration and login.

   2. Product Page: Displays the products available for purchase.

   3. Order Management: Allows users to place orders for products.

## Milestone 26:

   1. Receive the User's Email
      Create a POST endpoint that receives the user's email in the request body.

   2. Retrieve User ID
      Use the email to query your database and retrieve the user's _id.

   3. Retrieve Orders
      Use the retrieved _id to query your database and get all the orders associated with that user.

   4. Send the Response
      Send the user's orders in the response

Happy coding!!
