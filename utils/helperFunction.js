const isAccessTokenExpired = (expirationTimestamp) => {
    // Get current time in UTC seconds
    const currentTime = Math.floor(Date.now() / 1000);
    // Check if token expiration time (in seconds) is less than current time
    return expirationTimestamp < currentTime;
}
const isVerificationTokenValid = (verificationTokenExpiryTime) => {
    // Convert the expiry time to a Date object
    const expiryTime = new Date(verificationTokenExpiryTime);

    // Get the current time
    const currentTime = new Date();

    // Compare the current time with the expiry time
    return expiryTime > currentTime;
};


module.exports = { isAccessTokenExpired, isVerificationTokenValid }