import { useState, useMemo } from "react";

const EMOJIS = [
  "😀","😃","😄","😁","😅","😂","🤣","😊","😇","🙂","😍","🥰","😘","😗","😋","🤪","😜","😝","🤗","🤔","🤨","😐","😑","😶","🤫","🤭","😏","😒","🙄","😬","😮","🤐","😪","😴","🥱","😌","🤤","😷","🤒","🤕","🤢","🤮","🥴","😵","🤯","😎","🥸","🤩","🥳","😕","😟","🙁","😮‍💨","😤","😡","🤬","😈","👿","💀","☠️","💩","🤡","👹","👺","👻","👽","👾","🤖","🎃",
  "❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","💕","💖","💗","💘","💝","💟","❤️‍🔥","❤️‍🩹",
  "👍","👎","👏","🙌","🤝","👊","✊","🤛","🤜","✌️","🤞","🤟","🤘","👌","🤌","🤏","👈","👉","👆","👇","☝️","✋","🤚","🖐","🖖","👋","🤙","💪","🦵","🦶","🙏","💅","🤳",
  "🌟","⭐","✨","💫","🔥","💧","🌈","☀️","🌙","⚡","❄️","🌊","🍀","🌸","🌹","🌻","🎉","🎊","🎈","🏆","💰","💎","🔮","🎵","🎶","📢","🔔","💡","📌","✂️","🔑","🔒","🔓",
  "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🐔","🐧","🐦","🐤","🦆","🦅","🦉","🦇","🐺","🐗","🐴","🦄","🐝","🐛","🦋","🐌","🐞","🐜","🕷","🦂","🐢","🐍","🦎","🦖","🦕","🐙","🦑","🦐","🐠","🐟","🐡","🦈","🐳","🐋","🐊",
  "🍎","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🥑","🥦","🥬","🥒","🌶","🫑","🌽","🥕","🧄","🧅","🥔","🍠","🥐","🍞","🥖","🧀","🥚","🍳","🥞","🧇","🥩","🍗","🍖","🦴","🌭","🍔","🍟","🍕","🫓","🥪","🥙","🧆","🌮","🌯","🫔","🥗","🥘","🫕","🥫","🍝","🍜","🍲","🍛","🍣","🍱","🥟","🦪","🍤","🍙","🍚","🍘","🍥","🥮","🍢","🍡","🍧","🍨","🍦","🥧","🧁","🍰","🎂","🍮","🍭","🍬","🍫","🍿","🧈","🍩","🍪","🌰","🥜","🍯",
  "🚗","🚕","🚙","🚌","🚎","🏎","🚓","🚑","🚒","🚐","🛻","🚚","🚛","🚜","🏍","🛵","🛴","🚲","🛹","✈️","🚀","🛸","🚁","🛶","⛵","🚤","🛥","🛳","⛴","🚢",
  "⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🥏","🎱","🪀","🏓","🏸","🏒","🏑","🥍","🏏","🪃","🥅","⛳","🪁","🏹","🎣","🤿","🥊","🥋","🎽","🛹","🛼","🛷","⛸","🥌","🎿","⛷","🏂","🪂","🏋️","🤼","🤸","🤺","⛹️","🤾","🏌️","🏇","🧘","🏄","🏊","🤽","🧜","🧚",
  "⌚","📱","💻","⌨️","🖥","🖨","🖱","🖲","🕹","🗜","💿","📀","📷","📸","📹","🎥","📽","🎞","📞","☎️","📟","📠","📺","📻","🎙","🎚","🎛","🧭","⏱","⏲","⏰","🕰","⌛","📡","🔋","🔌","💡","🔦","🕯","🪔","🧯",
];

const CATEGORIES: Record<string, string[]> = {
  "Smileys": EMOJIS.slice(0, 60),
  "Hearts": EMOJIS.slice(60, 75),
  "Gestures": EMOJIS.slice(75, 100),
  "Symbols": EMOJIS.slice(100, 130),
  "Animals": EMOJIS.slice(130, 176),
  "Food": EMOJIS.slice(176, 240),
  "Vehicles": EMOJIS.slice(240, 260),
  "Sports": EMOJIS.slice(260, 290),
  "Objects": EMOJIS.slice(290, 320),
};

export function EmojiPickerTool() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState("");
  const [category, setCategory] = useState("Smileys");

  const filtered = useMemo(() => {
    if (!search) return CATEGORIES[category] || EMOJIS.slice(0, 100);
    const q = search.toLowerCase();
    return EMOJIS.filter(e => e.includes(q) || CATEGORIES[category]?.includes(e)).slice(0, 100);
  }, [search, category]);

  const copy = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search emoji..."
        className="w-full p-2 rounded-lg border bg-background text-foreground text-sm"
      />
      <div className="flex flex-wrap gap-1">
        {Object.keys(CATEGORIES).map(cat => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setSearch(""); }}
            className={`px-2 py-1 text-xs rounded-lg border transition-colors ${category === cat ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-8 sm:grid-cols-10 gap-1 max-h-64 overflow-auto">
        {filtered.map((emoji, i) => (
          <button
            key={i}
            onClick={() => copy(emoji)}
            className="text-2xl p-1.5 rounded hover:bg-accent transition-colors relative"
            title="Click to copy"
          >
            {emoji}
            {copied === emoji && <span className="absolute -top-1 -right-1 text-xs">✓</span>}
          </button>
        ))}
      </div>
      {copied && <p className="text-xs text-green-600 text-center">Copied {copied}!</p>}
    </div>
  );
}
