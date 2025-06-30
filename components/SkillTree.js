
import { useRouter } from 'next/router';

export default function SkillTree() {
  const router = useRouter();
  const skills = [
    { name: "Cells", id: "cells" },
    { name: "Microscopy", id: "microscopy" },
    { name: "Mitosis", id: "mitosis" },
    { name: "Transport", id: "transport" },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {skills.map((skill) => (
        <div
          key={skill.name}
          onClick={() => router.push(`/lesson/${skill.id}`)}
          className={`w-24 h-24 flex items-center justify-center rounded-full shadow-md
            bg-blue-500 text-white hover:scale-105 transition cursor-pointer`}
        >
          <span className="text-center text-sm font-semibold">{skill.name}</span>
        </div>
      ))}
    </div>
  );
}
