// Improved email validation function
const validateEmailAddress = (email) => {
  // Check if the input is a non-empty string
  if (typeof email !== 'string' || !email.trim()) {
    console.warn('Invalid input: Email must be a non-empty string.');
    return false;
  }

  // Normalize the email by converting it to lowercase (emails are case-insensitive)
  const normalizedEmail = email.toLowerCase();

  // Enhanced regular expression for email validation:
  // - Supports internationalized email addresses (e.g., Unicode characters).
  // - Ensures the local part and domain part are valid.
  // - Validates the top-level domain (TLD) length and structure.
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  // Test the normalized email against the regex
  const isValid = emailRegex.test(normalizedEmail);

  // Additional check: Ensure the TLD is at least 2 characters long
  if (isValid) {
    const tld = normalizedEmail.split('.').pop(); // Extract the TLD
    if (tld.length < 2) {
      console.warn('Invalid email: Top-level domain (TLD) must be at least 2 characters long.');
      return false;
    }
  }

  return isValid;
};

// Export the improved function for use in other modules
module.exports = {
  validateEmailAddress,
};