require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async function () {
  const apiKey = process.env.SOCCERS_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: "Missing SOCCERS_API_KEY" }),
    };
  }

  // SoccersAPI live fixtures endpoint (check your API docs for exact endpoint)
  const url = `https://api.soccersapi.com/v1/soccer/matches/live?api_token=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const json = await response.json();

    // Adjusted formatting based on typical SoccersAPI response structure
    const formatted = {
      data: json.data.map(match => ({
        league: match.league.name,
        home: {
          name: match.localteam_name,
          score: match.localteam_score
        },
        away: {
          name: match.visitorteam_name,
          score: match.visitorteam_score
        },
        time: {
          minute: match.time.elapsed || 'Live'
        }
      }))
    };

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formatted),
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
