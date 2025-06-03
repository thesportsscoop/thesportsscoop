require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const apiKey = process.env.FOOTBALL_API_KEY;
  const league = event.queryStringParameters.league || '';
  const status = event.queryStringParameters.status || 'live'; // 'live', 'finished', 'upcoming'

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key is missing. Check your .env file or Netlify Environment variables." })
    };
  }

  let endpoint = 'https://v3.football.api-sports.io/fixtures';

  let params = new URLSearchParams();
  if (status === 'live') {
    params.append('live', 'all');
  } else if (status === 'finished') {
    params.append('status', 'FT');
  } else if (status === 'upcoming') {
    params.append('next', '10'); // Adjust the number as needed
  }

  if (league) {
    params.append('league', league);
  }

  try {
    const response = await fetch(`${endpoint}?${params.toString()}`, {
      headers: {
        'x-apisports-key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data.errors) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API returned an error", details: data.errors })
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
