// Import the required modules
const express = require("express"); // Express framework for building web applications
const api = require("./api"); // Custom API handlers
const middleware = require("./middleware"); // Custom middleware functions
const bodyParser = require("body-parser"); // Middleware to parse request bodies

// Set the port, defaulting to 3000 if no environment variable is set
const port = process.env.PORT || 3000;

// Create an Express application
const app = express();

// Serve static files from the "public" directory
app.use(express.static(__dirname + "/public"));

// Enable Cross-Origin Resource Sharing (CORS) via custom middleware
app.use(middleware.cors);

// Use body-parser to handle JSON request bodies
app.use(bodyParser.json());

// Define API routes for the products resource
app.get("/products", api.listProducts); // Route to list all products
app.get("/products/:id", api.getProduct); // Route to get details of a specific product
app.post("/products", api.createProduct); // Route to create a new product
app.delete("/products/:id", api.deleteProduct); // Route to delete a specific product
app.put("/products/:id", api.editProduct); // Route to update an existing product

// Define the root route
app.get("/", api.handleRoot); // Route to handle the root path

// Use middleware to handle errors
app.use(middleware.handleError); // Middleware to handle application errors
app.use(middleware.notFound); // Middleware to handle 404 errors (not found)

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server listening on port ${port}`));
