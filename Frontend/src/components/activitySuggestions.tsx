import { useState } from 'react';

function ActivitySuggestions() {
  // State variables
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch activity suggestions based on city weather
  const fetchSuggestions = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5231/api/activity/suggested-activities?city=${city}`);
      console.log('Response status:', response.status); // Log status code
      if (!response.ok) {
        throw new Error('Kunde inte hämta aktiviteter');
      }

      const data = await response.json();
      setWeather(data.weather);
      setActivities(data.activities);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Något gick fel');
      } else {
        setError('Något gick fel');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-4">
      <h1 className="text-3xl text-center font-bold text-[#562f39] drop-shadow-md mb-4">Aktivitetsförslag</h1>
      <p className="text-center text-gray-600 mb-4">Skriv in din stad för att få väderbaserade aktivitetsförslag:</p>

      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="t.ex. Stockholm"
          className="p-2 border rounded-md shadow-sm w-2/3"
        />
        <button
          onClick={fetchSuggestions}
          className="ml-4 px-4 py-1 text-lg bg-[#562f39] text-white font-bold rounded-full shadow-md transition-transform transform hover:cursor-pointer hover:scale-110 hover:bg-[#bd7d8d] flex items-center justify-center gap-3"
        >
          Hämta förslag
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Hämtar aktiviteter...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {weather && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold">Det är {weather} ute idag</h2>
          <p className="text-gray-600">Här är några förslag på aktiviteter:</p>
          <ul className="mt-4 list-disc list-inside text-lg text-gray-800">
            {activities.map((activity, index) => (
              <li className="list-none" key={index}>{activity}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ActivitySuggestions;
