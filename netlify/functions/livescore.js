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

  const url = `https://api.sportmonks.com/v3/football/fixtures/upcoming?api_token=${apiKey}&include=participants,league&per_page=10`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();

    // Reformat to mimic livescore structure
    const formattedData = {
      data: data.data.map(fixture => {
        const home = fixture.participants?.find(p => p.meta?.location === 'home');
        const away = fixture.participants?.find(p => p.meta?.location === 'away');

        return {
          ...fixture,
          participants: [home, away],
          time: {
            minute: new Date(fixture.starting_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        };
      })
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
      body: JSON.stringify({ error: "Error fetching fixtures", details: error.message }),
    };
  }
};
