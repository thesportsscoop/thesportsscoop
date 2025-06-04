require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async function () {
  const apiKey = process.env.SPORTMONKS_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: "Missing SPORTMONKS_API_KEY" }),
    };
  }

  const url = `https://api.sportmonks.com/v3/football/livescores?api_token=${apiKey}&include=participants`;

  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const json = await res.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: "Error fetching data", 
        details: error.message 
      }),
    };
  }
};
