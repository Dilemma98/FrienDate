import { useState } from 'react';

const AddEvent = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddEvent = async () => {
    setMessage('');
    if (!eventTitle || !startDateTime || !endDateTime) {
      setMessage('Alla fält måste fyllas i.');
      return;
    }
    if (new Date(endDateTime) <= new Date(startDateTime)) {
      setMessage('Sluttid måste vara efter starttid.');
      return;
    }
    setLoading(true);

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setMessage('Ingen access token hittades. Var god logga in.');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5231/api/google/addEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          summary: eventTitle,
          start: { dateTime: new Date(startDateTime).toISOString() },
          end: { dateTime: new Date(endDateTime).toISOString() },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMessage(`Kunde inte lägga till händelse: ${errorText}`);
      } else {
        setMessage('Händelse tillagd framgångsrikt!');
        setEventTitle('');
        setStartDateTime('');
        setEndDateTime('');

        window.location.reload(); // Reload the page to reflect the new event
      }
    } catch (error) {
      setMessage(`Ett fel uppstod: ${error}`);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-12 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg space-y-5">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Lägg till en händelse
        </h2>

        <input
          type="text"
          placeholder="Titel på händelse"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="text-sm text-gray-600">Starttid</label>
        <input
          type="datetime-local"
          value={startDateTime}
          onChange={(e) => setStartDateTime(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="text-sm text-gray-600">Starttid</label>
        <input
          type="datetime-local"
          value={endDateTime}
          onChange={(e) => setEndDateTime(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          disabled={loading}
          onClick={handleAddEvent}
          className={`w-full hover:cursor-pointer bg-gradient-to-b from-[#7a4c5a] to-[#89656f] text-white py-3 rounded-xl shadow-md transition duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {loading ? 'Lägger till...' : 'Lägg till händelse'}
        </button>

        {message && (
          <p className={`text-center mt-2 ${message.includes('framgångsrikt') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddEvent;
