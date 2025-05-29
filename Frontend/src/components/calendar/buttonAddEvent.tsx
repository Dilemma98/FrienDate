import { useState } from "react";
import AddEvent from "./addEvent";

const AddEventButton = () => {
  const [showAddEvent, setShowAddEvent] = useState(false);

  const handleAddEventClick = () => {
    setShowAddEvent(true);
  };

  const handleClose = () => {
    setShowAddEvent(false);
  };

  return (
    <div className="">
      <button
        className="px-4 py-2 bg-[#bd7d8d95] hover:bg-[#a86a7c99] text-[#562f39] font-bold rounded-2xl shadow-lg transition duration-200 ease-in-out"
        onClick={handleAddEventClick}
      >
        Ny händelse ➕
      </button>
      {showAddEvent && <AddEvent onClose={handleClose} />}
    </div>
  );
};

export default AddEventButton;
