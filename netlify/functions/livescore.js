require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async function () {
  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: "Missing API_FOOTBALL_KEY" }),
    };
  }

  const url = `https://v3.football.api-sports.io/fixtures?live=all`;

  try {
    const response = await fetch(url, {
      headers: {
        'x-apisports-key': apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const json = await response.json();

    const formatted = {
      data: json.response.map(fixture => ({
        league: fixture.league.name,
        home: {
          name: fixture.teams.home.name,
          score: fixture.goals.home
        },
        away: {
          name: fixture.teams.away.name,
          score: fixture.goals.away
        },
        time: {
          minute: fixture.fixture.status.elapsed || 'Live'
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
