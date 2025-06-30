
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const storedXp = parseInt(localStorage.getItem('xp') || '0', 10);
    setXp(storedXp);
  }, []);

  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <span className="font-bold text-xl">Prototype 1</span>
      <div>XP: {xp} 🔥</div>
    </nav>
  );
}
