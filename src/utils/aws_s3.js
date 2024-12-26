require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');

// Cấu hình AWS S3
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const uploadToS3 = async (filePath, fileName) => {
    const fileContent = fs.readFileSync(filePath);

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,  // Tên file lưu trên S3
        Body: fileContent,
        ContentType: 'image/png',  // Thay đổi nếu là loại ảnh khác
        ACL: 'public-read',        // Quyền đọc công khai
    };

    try {
        const data = await s3.upload(params).promise();
        return data.Location;  // URL của file đã upload
    } catch (err) {
        console.error('Error uploading to S3:', err);
        throw err;
    }
};

module.exports = uploadToS3;
