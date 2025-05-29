export async function fetchActivitySuggestions(city: string) {
  const response = await fetch(
    `http://localhost:5231/api/activity/suggested-activities?city=${encodeURIComponent(city)}`
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta aktiviteter");
  }

  return await response.json();
}