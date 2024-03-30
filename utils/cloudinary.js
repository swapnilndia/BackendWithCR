const { v2: cloudinary } = require('cloudinary')
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_COULD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

module.exports = { uploadOnCloudinary }