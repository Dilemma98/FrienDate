import { useState } from "react";
import UserMenu from "../user/userMenu";

interface Group {
  name: string;
  members: string[];
}

export default function GroupPage() {
  const [groups, setGroups] = useState<Group[]>([
    { name: "Bästa vännerna 💖", members: ["Emma", "Kristin", "Matilda"] },
    { name: "Tramsbyttorna 🍷🥂🍸", members: ["Emma", "Tuva", "Tintin"] },
  ]);

  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupMembers, setNewGroupMembers] = useState("");
  const [error, setError] = useState("");

  const createGroup = () => {
    if (!newGroupName || !newGroupMembers) {
      setError("Gruppnamn och medlemmar kan inte vara tomma");
      return;
    }

    const membersArray = newGroupMembers
      .split(",")
      .map((member) => member.trim())
      .filter((member) => member);

    const newGroup: Group = { name: newGroupName, members: membersArray };
    setGroups([...groups, newGroup]);
    setNewGroupName("");
    setNewGroupMembers("");
    setError("");
  };

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Meny till vänster */}
        <UserMenu />

        {/* Gruppinnehåll */}
        <div className="flex-1 bg-white shadow-lg rounded-3xl p-6 md:p-8">
          <h1 className="text-2xl font-bold text-[#562f39] mb-2">
            Dina grupper 👥
          </h1>

          <div className="space-y-4">
            {groups.map((group, idx) => (
              <div
                key={idx}
                className="bg-[#f7f3f5] border border-[#e0cad1] rounded-xl p-4 shadow-sm"
              >
                <h2 className="flex justify-between items-center text-lg font-semibold text-[#562f39]">
                  {group.name}
                  <i className="fa-solid fa-message text-[#562f39]"></i>
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  👤 Medlemmar: {group.members.join(", ")}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold text-center text-[#562f39] mb-4">
              Skapa ny grupp ➕
            </h2>

            {error && (
              <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
            )}

            <input
              type="text"
              placeholder="Gruppnamn"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="w-full p-3 mb-3 border border-[#e0cad1] rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#bd7d8d]"
            />

            <input
              type="text"
              placeholder="Medlemmar, separera med kommatecken"
              value={newGroupMembers}
              onChange={(e) => setNewGroupMembers(e.target.value)}
              className="w-full p-3 mb-4 border border-[#e0cad1] rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#bd7d8d]"
            />

            <button
              onClick={createGroup}
              className="w-full py-2 bg-gradient-to-b from-[#7a4c5a] to-[#89656f] text-white rounded-xl font-semibold hover:opacity-90 transition"
            >
              Skapa grupp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
