// Import required modules
const path = require("path"); // Built-in Node.js module for handling file paths
const Products = require("./products"); // Products service or model for interacting with product data
const autoCatch = require("./lib/auto-catch"); // Utility to automatically catch and handle errors in async functions

/**
 * Handle the root route by serving the main HTML file
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, "/index.html")); // Serve the index.html file
}

/**
 * Get details of a specific product
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @param {function} next - The next middleware function
 */
async function getProduct(req, res, next) {
  const { id } = req.params; // Extract the product ID from the request parameters

  const product = await Products.get(id); // Fetch the product by ID
  if (!product) {
    return next(); // If the product is not found, pass control to the next middleware
  }
  return res.json(product); // Send the product data as a JSON response
}

/**
 * List all products with optional pagination and filtering
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 */
async function listProducts(req, res) {
  // Extract the limit, offset, and tag query parameters
  const { offset = 0, limit = 25, tag } = req.query;

  res.json(
    await Products.list({
      offset: Number(offset), // Convert offset to a number
      limit: Number(limit), // Convert limit to a number
      tag, // Optional tag for filtering products
    }),
  ); // Send the list of products as a JSON response
}

/**
 * Create a new product
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 */
async function createProduct(req, res) {
  console.log("request body:", req.body); // Log the incoming request body for debugging
  res.json(req.body); // Echo the request body back as the response (placeholder implementation)
}

/**
 * Update an existing product
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @param {function} next - The next middleware function
 */
async function editProduct(req, res, next) {
  const { id } = req.params; // Extract the product ID from the request parameters
  const updatedData = req.body; // Extract the updated product data from the request body
  console.log(`Product ${id} updated with data:`, updatedData); // Log the update action
  res.status(200).json({ success: true, message: `Product ${id} updated` }); // Respond with a success message
}

/**
 * Delete an existing product
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @param {function} next - The next middleware function
 */
async function deleteProduct(req, res, next) {
  const { id } = req.params; // Extract the product ID from the request parameters
  console.log(`Product ${id} deleted`); // Log the delete action
  res.status(202).json({ success: true, message: `Product ${id} deleted` }); // Respond with a success message
}

// Export all route handlers wrapped with the autoCatch utility for error handling
module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
});
