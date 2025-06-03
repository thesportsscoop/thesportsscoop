require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const apiKey = process.env.SPORTMONKS_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key is missing. Check your .env file or Netlify environment variables." })
    };
  }

  const endpoint = `https://api.sportmonks.com/v3/football/livescores?api_token=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API returned an error", details: data.error })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Fetch failed", message: err.message })
    };
  }
};
