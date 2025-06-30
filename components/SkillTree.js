
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SkillTree() {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState({});

  const skills = [
    { name: "Biology - Cells", id: "cells" },
    { name: "Biology - Microscopy", id: "microscopy" },
    { name: "Biology - Mitosis", id: "mitosis" },
    { name: "Chemistry - Atoms", id: "atoms" },
    { name: "Chemistry - Bonding", id: "bonding" },
    { name: "Physics - Energy", id: "energy" },
    { name: "Physics - Forces", id: "forces" }
  ];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('unlocked') || '{}');
    setUnlocked(stored);
  }, []);

  const handleClick = (skill) => {
    if (unlocked[skill.id] || skill.id === 'cells') {
      router.push(`/lesson/${skill.id}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {skills.map((skill) => {
        const isUnlocked = skill.id === 'cells' || unlocked[skill.id];

        return (
          <div
            key={skill.id}
            onClick={() => handleClick(skill)}
            className={`w-28 h-28 flex items-center justify-center rounded-full shadow-md
              ${isUnlocked ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"}
              hover:scale-105 transition cursor-pointer`}
          >
            <span className="text-center text-sm font-semibold">{skill.name}</span>
          </div>
        );
      })}
    </div>
  );
}
