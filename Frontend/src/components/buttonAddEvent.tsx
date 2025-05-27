import {useState} from 'react';
import AddEvent from './addToCalendar';

const AddEventButton = () => {
    const [showAddEvent, setShowAddEvent] = useState(false);

    const handleAddEventClick = () => {
        setShowAddEvent(true);
    };

    return (
         <div className="absolute bottom-45 right-10 lg:right-88 lg:bottom-47 z-50">
            <button
                className="hover:cursor-pointer bg-gradient-to-b from-[#7a4c5a] to-[#89656f] text-white shadow-md text-black rounded w-35 mb-4"
                onClick={handleAddEventClick}
            >
                Ny händelse ➕
            </button>
            {showAddEvent && <AddEvent />}
        </div>
    );
}

export default AddEventButton;