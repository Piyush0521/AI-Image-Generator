const { response } = require("express");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;

  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: size,
    });

    const imageUrl = response.data[0].url;
    res.status(200).json({
      success: true,
      data: imageUrl,
    });
    console.log("imageUrl -> ", imageUrl);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "The image could not be generated",
      reason: error,
    });
  }
};

module.exports = { generateImage };
