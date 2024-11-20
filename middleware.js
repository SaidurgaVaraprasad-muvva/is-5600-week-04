// Middleware function to handle Cross-Origin Resource Sharing (CORS)
function cors(req, res, next) {
    const origin = req.headers.origin; // Get the origin of the request from the headers
    // Set CORS headers to allow cross-origin requests
    res.setHeader("Access-Control-Allow-Origin", origin || "*"); // Allow the specific origin or all origins
    res.setHeader(
        "Access-Control-Allow-Methods", // Specify allowed HTTP methods
        "POST, GET, PUT, DELETE, OPTIONS, XMODIFY"
    );
    res.setHeader("Access-Control-Allow-Credentials", true); // Allow credentials (cookies, authorization headers, etc.)
    res.setHeader("Access-Control-Max-Age", "86400"); // Cache the CORS preflight response for 24 hours (86400 seconds)
    res.setHeader(
        "Access-Control-Allow-Headers", // Specify allowed request headers
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    next(); // Proceed to the next middleware or route handler
}

// Middleware function to handle errors
function handleError(err, req, res, next) {
    console.error(err); // Log the error to the server console for debugging
    // Check if the response headers have already been sent
    if (res.headersSent) {
        return next(err); // If headers are sent, pass the error to the next middleware
    }
    // Send a generic 500 Internal Server Error response
    res.status(500).json({ error: "Internal Error Occurred" });
}

// Middleware function to handle 404 Not Found errors
function notFound(req, res) {
    // Send a 404 error response with a JSON error message
    res.status(404).json({ error: "Not Found" });
}

// Export the middleware functions for use in other modules
module.exports = {
    cors, // Export the CORS middleware
    handleError, // Export the error-handling middleware
    notFound, // Export the 404 error handler
};
