import jwt from "jsonwebtoken";

// The jwt-api auth can either be a string or a buffer.  The string is the secret key and would be setup in the jwt-api auth settings for the org.
// Ideally you would create this signed token and the platform uses a configured a JWKS uri to validate the token.  

export default function createToken() {
  const tokenToSign = {
    sub: process.env.JWT_SUBJECT,
    name: process.env.JWT_NAME,

    // Preferred username maps onto the username in our users table
    preferred_username: process.env.JWT_PREFERRED_USERNAME,

    // iss (issuer) is configured in the jwt-api auth settings for the org.  This must match
    iss: "test",

    // aud (audience) is configured in the jwt-api auth settings for the org.  This must match
    aud: "test",

    // iat (issued at) is the timestamp of the token issuance
    iat: Math.floor(Date.now() / 1000),

    // Optional: exp (expires at) is the timestamp of the token expiration
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
  };

  return jwt.sign(
    tokenToSign,
    process.env.JWT_SIGNING_KEY || "No-Key-Provided"
  );
}
