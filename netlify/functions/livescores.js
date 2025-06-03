require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async function () {
  const apiKey = process.env.SPORTMONKS_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing SPORTMONKS_API_KEY" }),
    };
  }

  const url = `https://api.sportmonks.com/v3/football/livescores?api_token=${apiKey}`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(json),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching data", details: error.message }),
    };
  }
};
