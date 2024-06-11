/**
 * script.js.
 *
 * @author Rosnin Mustaffa
 */

// Function to validate username
function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]{7,}$/;
    return usernameRegex.test(username);
}

// Exporting the validateUsername function
module.exports = { validateUsername };
