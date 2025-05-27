import { ToolbarProps } from "react-big-calendar";

const CustomToolbar: React.FC<ToolbarProps<any, object>> = ({
  label,
  onNavigate,
}) => {
  return (
    <div
      style={{ textAlign: "center", marginBottom: "1rem", marginTop: "1rem" }}
    >
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        {label}
      </div>
      <div className="flex justify-center gap-6">
        <button
          onClick={() => onNavigate("PREV")}
          className="px-4 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200"
        >
          ⟵ Föregående
        </button>
        <button
          onClick={() => onNavigate("TODAY")}
          className="px-4 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200"
        >
          Idag
        </button>
        <button
          onClick={() => onNavigate("NEXT")}
          className="px-4 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200"
        >
          Nästa ⟶
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;