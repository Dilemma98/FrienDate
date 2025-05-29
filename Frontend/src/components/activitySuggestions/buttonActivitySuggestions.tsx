import { Link } from "react-router-dom";

const ActivitySuggestionsButton = () => {
  return (
    <button className="px-4 py-2 bg-[#bd7d8d40] hover:bg-[#a86a7c99] text-[#562f39] font-bold rounded-2xl shadow-md transition duration-200 ease-in-out">
      <Link
        to="/activitySuggestions"
        className="transition-colors duration-300"
      >
        Aktivitetsförslag
      </Link>
    </button>
  );
};

export default ActivitySuggestionsButton;
