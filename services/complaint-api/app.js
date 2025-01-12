const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9000;

app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

app.post('/check-image', async (req, res) => {
    const { imageUrl, animal } = req.body;

    const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`,
        {
            requests: [
                {
                    image: { source: { imageUri: imageUrl } },
                    features: [{ type: 'LABEL_DETECTION', maxResults: 10 }]
                }
            ]
        }
    );

    const labels = response.data.responses[0].labelAnnotations.map(label => label.description);
    const isAnimal = labels.some(label => ['Animal', 'Mammal', 'Bird', 'Fish', 'Reptile'].includes(label));

    res.send({ isAnimal })
});

app.listen(PORT, () => console.log("Is animal checker is running"))