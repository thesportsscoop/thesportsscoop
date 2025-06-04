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

  // Use a free-tier-compatible endpoint like "upcoming" or "fixtures/date/today"
  const url = `https://api.sportmonks.com/v3/football/fixtures/date/today?api_token=${apiKey}&include=participants,league`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();

    const formattedData = {
      data: (data.data || []).map(match => ({
        ...match,
        time: {
          minute: new Date(match.starting_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      }))
    };

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: "Error fetching fixtures",
        details: error.message
      }),
    };
  }
};
