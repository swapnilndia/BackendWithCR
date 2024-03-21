 function isTokenExpired(expirationTimestamp) {
    // Get current time in UTC seconds
    const currentTime = Math.floor(Date.now() / 1000);
    // Check if token expiration time (in seconds) is less than current time
    console.log(currentTime)
    return expirationTimestamp < currentTime;
}

module.exports = {isTokenExpired}