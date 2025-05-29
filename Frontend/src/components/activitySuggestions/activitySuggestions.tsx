import { useState } from 'react';
import { fetchActivitySuggestions } from './weatherService';
import UserMenu from '../user/userMenu';

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
    <div className="min-h-screen py-4 px-0 mt-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* UserMenu i sidokolumn */}
        <UserMenu />

        {/* Huvudinnehåll */}
        <div className="flex-1 bg-white shadow-md rounded-2xl p-6 mb-10">
          <h1 className="text-3xl font-bold text-[#562f39] mb-6 drop-shadow-md">
            Aktivitetsförslag 🎉
          </h1>
          <p className="text-gray-600 mb-6 text-center md:text-left">
            Skriv in din stad för att få väderbaserade aktivitetsförslag:
          </p>

          <div className="flex justify-center md:justify-start items-center mb-6 gap-3 max-w-md mx-auto md:mx-0">
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
              className="flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#bd7d8d] text-[#562f39] font-semibold shadow-sm"
            />
            <button
              onClick={handleFetch}
              className="p-3 px-6 bg-gradient-to-b from-[#7a4c5a] to-[#89656f] text-white font-bold rounded-full shadow-md hover:scale-105 transition-transform"
            >
              Hämta förslag
            </button>
          </div>

          {loading && (
            <p className="text-gray-500 font-medium text-center md:text-left">
              Hämtar aktiviteter...
            </p>
          )}
          {error && (
            <p className="text-red-500 font-semibold text-center md:text-left">
              {error}
            </p>
          )}

          {weather && (
            <div className="mt-6 text-center md:text-left">
              {typeof temperature === 'number' && (
                <h2 className="text-xl font-semibold text-[#562f39] mb-2">
                  Det är {weather} och cirka {Math.round(temperature)}°C ute idag
                </h2>
              )}
              <p className="text-gray-600 mb-4">
                Här är några förslag på aktiviteter:
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {activities.map((activity, index) => (
                  <span
                    key={index}
                    className="bg-[#EDE1E5] text-[#562f39] px-5 py-2 rounded-full text-sm font-semibold shadow hover:bg-[#D6B4BF] cursor-pointer transition-colors"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivitySuggestions;
