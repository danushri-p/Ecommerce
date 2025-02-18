## E-Commerce Application

# Milestone 1: Project Overview

This project is a simple e-commerce web application that includes core functionalities such as user authentication, product display, order management, and a payment gateway.

  1. User Authentication:** Registration and login process.

  2. Product Page:** Displays the products.

  3. Order Page:** Shows order details of each product.

  4. Payment Gateway:** Handles the payment process for ordered products.

# Milestone 2: Setup

## 1. Setup Frontend:

   1. Install Tailwind CSS

   2. Create a React project

## 2. Set up the Backend:

1. Initialize the project: npm init to create a package.json file.

2. Install necessary packages:

  - `express`: Used for routing and handling logic in the server.

  - `mongoose`: Connects and interacts with MongoDB, providing a schema-based solution for data management.

  - `cors`: Enables cross-origin requests for frontend-backend communication.

  - `nodemon`: Automatically restarts the server on file changes for efficient development.

After these configurations, the project is ready for full-stack development.

# Milestone 3: Setting Up the Backend

## 1. Setting Up Node.js Server:

  1. Installed necessary packages like `express` and `dotenv`.

  2.  Created a server file (`server.js` or `app.js`) to define routes and middleware.

## 2. Connecting to MongoDB:
  1. Defined connection configurations in a .env file.
  
  2. Created a database.js file in the DB folder to establish a MongoDB connection.

## 3. Error Handling:

  1. Used try-catch blocks for async operations to handle promise rejections.

# Milestone 4: User Model

  1. Created a user.model.js file in the models directory.

  2. Defined schema using Mongoose.

## 1. Setting up Controllers:

  1. Created a user.controller.js file in the controllers directory.

## 2. Enabling File Uploads:

1. Installed multer 

2. Updated the controller and routes accordingly.

# Milestone 5: User Signup Page

1. Created input fields for name, email, password, and file upload.

2.Implemented validation using Regular Expressions:

  a. Name: Must have at least 2 letters, no symbols.
  
  b. Password: 8-128 characters, including lowercase, uppercase, and special characters.
  
  c. Email: Must be in the correct format.

3. Set up React Router for navigation.

# Milestone 6: Email Verification

## 1. Generate a JWT Token at Signup:

  a. Created a verification link containing the token.

## 2. Configure Nodemailer to Send Emails:

  a. Sent verification links via email.
  
  b. Created an API endpoint to verify tokens and activate accounts.

# Milestone 7: Authentication

## 1. Signup:

  a. Checked if the user already exists; if yes, prompted them to log in.
  

## 2. Login:

  1. Validated user credentials.
    
  2. If valid, generated a token and sent it as a cookie.
  
  3. If invalid, prompted the user to sign up.

# Milestone 8: Product Components & Homepage

## 1. Created a Reusable Card Component:

  1. Displays product name, image, and price dynamically using props.

## 2. Designed Homepage Layout:

  1. Implemented a structured grid layout for a clean design.

# Milestone 9: Product Form

  1. Created a form with fields for title, description, rating, discounted price, original price, quantity, category, and images.

  2. Used FormData to send the data.

# Milestone 10: Product Schema & API

  1. Defined the product schema using Mongoose with proper validation.

  2. Created a POST endpoint to receive and validate product data.

# Milestone 11: Fetching Products

  1. Created an endpoint to retrieve product data and return it as JSON.
  
  2. Wrote a query to fetch data from MongoDB.

# Milestone 12: Displaying Product Details
- Created an API endpoint to retrieve product details.
- Used Axios to call the API.

# Milestone 13: Product Updates

  1. Created an endpoint to handle data updates.

  2. Added an edit button.

  3. Clicking the button opens a form pre-filled with existing product data.

# Milestone 14: Product Deletion

  1. Created an endpoint to delete product data.

  2. Added a delete button to remove products from the database.

# Milestone 15: Navbar Component

  1. Implemented a responsive navbar design.

# Milestone 16: Product Details Page

  1. Displayed title, description, rating, price, category, and images.

# Milestone 17: Shopping Cart

  1.Defined a schema to store products in the cart.

  2. Created an endpoint to add products to the cart.

# Milestone 18: Fetching Cart Data

  1. Added an endpoint to receive cart requests and fetch all products.

# Milestone 19: Cart UI

  1. Designed a UI to display all cart items for each logged-in user.

# Milestone 20: User Profile

  1. Created an endpoint to fetch user data and profile details.
  
  2. Displayed user profile information.

# Milestone 21: Address Form

  1. Took user input (city, country, address lines, zip code, address type).

# Milestone 22: Address Management

  1. Stored user-entered address details in the database.
  
  2. Displayed saved addresses on the profile page.

# Milestone 23: Checkout Process

  1. Added a 'Checkout' button in the cart page, navigating to the select address page.
  
  2. Displayed saved addresses from the database.

# Milestone 24: Order Confirmation

  1. Allowed users to select an address.

  2. Displayed all cart items and calculated the total order amount.

  3. Added a 'Place Order' button.

# Milestone 25: Order Storage

  1. Retrieved user ID based on their email.
     
  2. Created an order entry for each product.
     
  3. Stored order details in a MongoDB collection.

# Milestone 26: 

  1. Retrieve User ID:

     Extract the user's email from the request.

     Query the database to get the corresponding _id of the user.

  2. Fetch User Orders:

     Use the retrieved _id to search for all orders linked to that user.

     Retrieve and structure the order details.

  3. Send Response:

     Return all orders of the user in the response.

     Handle errors appropriately if the user is not found or has no orders.

# Milestone 26: My Orders Page

  Created a My Orders page to display all the user's orders.

  Sent a GET request to the my-orders endpoint, passing the user’s email to retrieve order details.

  Fetched all orders associated with the user from the backend.
  
  Displayed the retrieved orders in a structured format on the My Orders page.
  
  Added a My Orders link in the navbar for easy navigation.

# Milestone 28: Cancel Order Feature

  Added a Cancel Order button for each order on the My Orders page.

  The Cancel Order button is not displayed for orders that are already canceled.

  Created a POST endpoint to receive the order-id.

  Retrieved the order using the provided order-id, updated its status to canceled, and saved the changes.

# Milestone 29: Setting Up PayPal Payments

  Created a PayPal Developer Account and accessed the PayPal Developer Dashboard.

  Generated a Sandbox Account and copied the UserID for testing.
  
  Retrieved and saved the Client ID from the sandbox accounts.
  
  Updated the Order Confirmation Page to include two payment options:

  Cash on Delivery (COD)
  
  Online Payment (PayPal)
  
  Added radio buttons to allow users to select their preferred payment method.

  Displayed PayPal buttons when the user selects Online Payment.

  The next milestone will focus on integrating and handling PayPal payments.

# Milestone 30: Implementing PayPal Online Payment

  Used the PayPal Client ID from the Sandbox Account for integration.
  
  Installed the react-paypal-js package to handle PayPal payments.
  
  Implemented the PayPalScriptProvider component to display PayPal payment options like credit/debit cards.
  
  Integrated PayPal API to enable secure online payments.
  
  The payment method is displayed only when the user selects the Online Payment option

# Milestone 31: Implementing Redux for Global User Email State

  This milestone focuses on integrating Redux into the application to manage the user's email globally. 
  
  It involves setting up a Redux store, creating actions for updating the user’s email, and using the Provider component to make the store available throughout the app.
