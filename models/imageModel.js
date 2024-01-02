const { Storage } = require('@google-cloud/storage');
const stream = require('stream');

const storage = new Storage({
  keyFilename: `./service.json`,
});

const bucketName = 'musicapp_profileimageupload';
const bucket = storage.bucket(bucketName);

// Function to get the public URL of the uploaded file
function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const fileMetadata = {
      contentType: req.file.mimetype,
    };

    const file = bucket.file(`profileimage/${req.file.originalname}`);
    const writeStream = file.createWriteStream({
      metadata: fileMetadata,
    });

    writeStream.on('error', (err) => {
      console.error(`Error uploading image: ${err}`);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    writeStream.on('finish', () => {
      const imageUrl = getPublicUrl(file.name);
      console.log(`Image ${req.file.originalname} uploaded to ${imageUrl}.`);
      // Optionally, you can send a response to the client indicating success
      res.status(200).json({ success: true, fileId: file.id, imageUrl });
    });

    // Pipe the ReadableStream to the WriteStream
    stream.pipeline(stream.Readable.from(req.file.buffer), writeStream, (err) => {
      if (err) {
        console.error(`Error piping streams: ${err}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  } catch (error) {
    console.error(`Error uploading image: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { uploadImage };
