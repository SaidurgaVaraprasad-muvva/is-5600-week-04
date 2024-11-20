// Import required modules
const fs = require("fs").promises; // File system module with promise-based methods
const path = require("path"); // Path module to handle file paths

// Define the path to the JSON file containing product data
const productsFile = path.join(__dirname, "data/full-products.json");

// Function to list products with optional filters and pagination
async function list(options = {}) {
  // Destructure optional parameters, with defaults for offset, limit, and tag
  const { offset = 0, limit = 25, tag } = options;

  // Read the product data file asynchronously
  const data = await fs.readFile(productsFile);

  // Parse the data and apply filtering and pagination
  return JSON.parse(data)
    .filter((product) => {
      if (!tag) {
        return product; // Include all products if no tag filter is provided
      }
      // Include products with a matching tag
      return product.tags.find(({ title }) => title == tag);
    })
    .slice(offset, offset + limit); // Return a subset of products based on offset and limit
}

// Function to retrieve a product by its ID
async function get(id) {
  // Read and parse the product data file
  const products = JSON.parse(await fs.readFile(productsFile));

  // Iterate over the products to find the one with a matching ID
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i]; // Return the matching product
    }
  }

  // Return null if no product with the given ID is found
  return null;
}

// Function to update a product by its ID
async function update(id, data) {
  // Placeholder: Log the update request to the console
  console.log(`Product ${id} would be updated with:`, data);
  return true; // Indicate a successful operation (placeholder behavior)
}

// Function to delete a product by its ID
async function deleteProduct(id) {
  // Placeholder: Log the delete request to the console
  console.log(`Product ${id} would be deleted`);
  return true; // Indicate a successful operation (placeholder behavior)
}

// Export the functions for use in other modules
module.exports = {
  list, // Export the list function
  get, // Export the get function
  update, // Export the update function
  deleteProduct, // Export the delete function
};
