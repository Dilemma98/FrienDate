import { useState } from 'react';
import { fetchActivitySuggestions } from './weatherService';

function ActivitySuggestions() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState<number | null>(null);
  const [activities, setActivities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const data = await fetchActivitySuggestions(city);
      setWeather(data.weather);
      setTemperature(data.temperature);
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
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-4 mb-20">
      <h1 className="text-3xl text-center font-bold text-[#562f39] drop-shadow-md mb-4">Aktivitetsförslag 🎉</h1>
      <p className="text-center text-gray-600 mb-4">Skriv in din stad för att få väderbaserade aktivitetsförslag:</p>

      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleFetch();
            }
          }}
          placeholder="t.ex. Stockholm"
          className="p-2 border rounded-md shadow-sm w-2/3"
        />
        <button
          onClick={handleFetch}
          className="m-2 p-2 text-md font-bold text-white rounded-full shadow-md bg-gradient-to-b from-[#7a4c5a] to-[#89656f] hover:scale-105 transition-all hover:cursor-pointer"
        >
          Hämta förslag
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Hämtar aktiviteter...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {weather && (
        <div className="mt-4 text-center">
          {typeof temperature === 'number' && (
            <h2 className="text-xl font-semibold">
              Det är {weather} och cirka {Math.round(temperature)}°C ute idag
            </h2>
          )}
          <p className="text-gray-600 mt-2">Här är några förslag på aktiviteter:</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {activities.map((activity, index) => (
              <span
                key={index}
                className="bg-[#EDE1E5] text-[#562f39] px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-[#D6B4BF] transition"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivitySuggestions;