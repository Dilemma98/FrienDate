import { useState } from "react";

interface Group {
  name: string;
  members: string[];
}

export default function GroupPage() {
  const [groups, setGroups] = useState<Group[]>([
    { name: "Tjejgänget 👑", members: ["Emma", "Kristin", "Matilda"] },
    { name: "Tramsbyttorna 🍷🥂🍸", members: ["Emma", "Tuva", "Tintin"] },
  ]);

  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupMembers, setNewGroupMembers] = useState(""); // 🔧 ändrat från string[] till string
  const [error, setError] = useState(""); // 🔧 lagt till error

  const createGroup = () => {
    if (!newGroupName || !newGroupMembers) {
      setError("Gruppnamn och medlemmar kan inte vara tomma");
      return;
    }

    const membersArray = newGroupMembers
      .split(",")
      .map((member) => member.trim())
      .filter((member) => member); // tar bort tomma strängar

    const newGroup: Group = { name: newGroupName, members: membersArray };
    setGroups([...groups, newGroup]);
    setNewGroupName("");
    setNewGroupMembers("");
    setError("");
  };

  return (
    <div className="max-w-xl mx-auto mt-4 mb-20 p-6 bg-white rounded-lg shadow">
      {/* <p className="text-center">Obs, sidan är under konstruktion</p> */}
      <h1 className="text-3xl font-bold text-center text-[#562f39] mb-6 drop-shadow">
        Dina grupper 👥
      </h1>

      {groups.map((group, idx) => (
        <div
          key={idx}
          className="mb-4 p-4 rounded-md shadow-md bg-[#F7EDF0]"
        >
          <h2 className="flex justify-between items-center text-xl font-semibold text-[#562f39] hover:cursor-pointer">
            {group.name}
            <i className="fa-solid fa-message text-[#562f39]"></i>
          </h2>
          <p className="text-sm text-gray-700 mt-1">
            👤 Medlemmar: {group.members.join(", ")}
          </p>
        </div>
      ))}

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2 text-[#562f39] text-center">
          Skapa ny grupp ➕
        </h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Gruppnamn"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          className="w-full p-2 mb-2 border rounded-md"
        />

        <input
          type="text"
          placeholder="Medlemmar, separera med kommatecken"
          value={newGroupMembers}
          onChange={(e) => setNewGroupMembers(e.target.value)}
          className="w-full p-2 mb-2 border rounded-md"
        />

        <button
          onClick={createGroup}
          className="w-full py-2 bg-gradient-to-b from-[#7a4c5a] to-[#89656f] text-white rounded-md font-semibold hover:bg-[#bd7d8d] transition hover:cursor-pointer"
        >
          Skapa grupp
        </button>
      </div>
    </div>
  );
}
