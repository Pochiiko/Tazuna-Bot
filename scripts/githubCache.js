import fetch from 'node-fetch';

// In-memory cache
const cache = {
  supporters: [],
  skills: [],
  events: [],
  characters: [],
  users: [],
  races: [],
  champsmeets: []
};

// GitHub raw URLs
const urls = {
  supporters: 'https://raw.githubusercontent.com/JustWastingTime/TazunaDiscordBot/main/assets/supporter.json',
  skills: 'https://raw.githubusercontent.com/JustWastingTime/TazunaDiscordBot/main/assets/skill.json',
  events: 'https://raw.githubusercontent.com/JustWastingTime/TazunaDiscordBot/main/assets/event.json',
  characters: 'https://raw.githubusercontent.com/JustWastingTime/TazunaDiscordBot/main/assets/character.json',
  races: 'https://raw.githubusercontent.com/JustWastingTime/TazunaDiscordBot/main/assets/races.json',
  champsmeets: 'https://raw.githubusercontent.com/JustWastingTime/TazunaDiscordBot/main/assets/champsmeet.json'
};

// Function to fetch a JSON file
async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.json();
}

// Function to update all cached data
async function updateCache() {
  try {
    console.log('Updating JSON cache from GitHub...');
    for (const key of Object.keys(urls)) {
      cache[key] = await fetchJson(urls[key]);
    }
    console.log('Cache updated successfully.');
  } catch (err) {
    console.error('Error updating cache:', err);
  }
}

// Initial fetch
await updateCache();

// Refresh every hour
setInterval(updateCache, 1000 * 60 * 60); // 1 hour

export default cache;