require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async function () {
  const apiKey = process.env.SPORTMONKS_API_KEY;

  if (!apiKey) {require('dotenv').config();
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

  // Free-tier compatible endpoint (upcoming matches)
  const url = `https://api.sportmonks.com/v3/football/fixtures/upcoming?api_token=${apiKey}&include=participants,league&per_page=10`;

  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();

    // Format response to match your frontend expectations
    const formattedData = {
      data: data.data?.map(match => ({
        ...match,
        time: { 
          minute: new Date(match.starting_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
      })) || []
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
