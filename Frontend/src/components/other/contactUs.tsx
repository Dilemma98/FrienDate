export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfcfd] to-[#faf7f9] py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#562f39] drop-shadow mb-4">
          Kontakta oss 📧
        </h1>

        <p className="text-center text-lg text-[#5a3c48] mb-8">
          Vi är alltid glada att höra från dig! Fyll i formuläret nedan så hör vi av oss så snart vi kan.
        </p>

        <form className="flex flex-col gap-5 w-full max-w-md mx-auto bg-[#F7EDF0] rounded-3xl p-8 shadow-lg">
          <div>
            <label className="block text-[#562f39] font-semibold mb-1">Namn</label>
            <input
              type="text"
              name="name"
              placeholder="Ditt namn"
              required
              className="w-full p-4 text-[#5a3c48] border-2 border-[#e1c3cb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bd7d8d] transition"
            />
          </div>

          <div>
            <label className="block text-[#562f39] font-semibold mb-1">E-post</label>
            <input
              type="email"
              name="email"
              placeholder="Din e-postadress"
              required
              className="w-full p-4 text-[#5a3c48] border-2 border-[#e1c3cb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bd7d8d] transition"
            />
          </div>

          <div>
            <label className="block text-[#562f39] font-semibold mb-1">Meddelande</label>
            <textarea
              name="message"
              placeholder="Vad vill du säga?"
              required
              className="w-full p-4 text-[#5a3c48] border-2 border-[#e1c3cb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bd7d8d] resize-none min-h-[150px] transition"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-3 bg-[#bd7d8d] hover:bg-[#a86a7c] text-white text-lg font-medium rounded-2xl shadow-md transition"
          >
            Skicka ✨
          </button>
        </form>
      </div>
    </div>
  );
}
