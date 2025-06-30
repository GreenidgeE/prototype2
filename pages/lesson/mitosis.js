
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function LessonPage() {
  const router = useRouter();
  const [xp, setXp] = useState(0);

  const data = {"title": "Mitosis", "lesson": "Mitosis is the process of cell division.", "question": "What is the end result of mitosis?", "options": ["4 cells", "2 identical cells", "1 cell", "8 cells"], "answer": "2 identical cells"};

  useEffect(() => {
    const storedXp = parseInt(localStorage.getItem('xp') || '0', 10);
    setXp(storedXp);
  }, []);

  const handleAnswer = (option) => {
    if (option === data.answer) {
      const newXp = xp + 10;
      localStorage.setItem('xp', newXp.toString());
      setXp(newXp);
      alert('Correct! +10 XP');
    } else {
      alert('Incorrect!');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      <p className="mb-4">{data.lesson}</p>
      <h2 className="font-semibold mb-2">Quiz:</h2>
      <p className="mb-2">{data.question}</p>
      <div className="flex flex-col gap-2">
        {data.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {opt}
          </button>
        ))}
      </div>
      <button onClick={() => router.push('/')} className="mt-4 underline">Back to Skill Tree</button>
    </div>
  );
}
