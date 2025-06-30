
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const lessons = {
  cells: {
    title: "Biology - Cells",
    lesson: "Cells are the basic building blocks of life.",
    questions: [
      { question: "What controls cell activities?", options: ["Nucleus", "Membrane", "Ribosome", "Mitochondria"], answer: "Nucleus" },
      { question: "What produces energy?", options: ["Nucleus", "Mitochondria", "Membrane", "Ribosome"], answer: "Mitochondria" },
      { question: "Which is not in animal cells?", options: ["Nucleus", "Cell wall", "Cytoplasm", "Membrane"], answer: "Cell wall" }
    ],
    unlocks: "microscopy"
  },
  microscopy: {
    title: "Biology - Microscopy",
    lesson: "Microscopes allow us to see small structures.",
    questions: [
      { question: "Which microscope has higher resolution?", options: ["Light", "Electron"], answer: "Electron" },
      { question: "Which is cheaper?", options: ["Light", "Electron"], answer: "Light" }
    ],
    unlocks: "mitosis"
  },
  mitosis: {
    title: "Biology - Mitosis",
    lesson: "Mitosis creates identical cells.",
    questions: [
      { question: "How many cells after mitosis?", options: ["1", "2", "4", "8"], answer: "2" }
    ],
    unlocks: "atoms"
  },
  atoms: {
    title: "Chemistry - Atoms",
    lesson: "Atoms are the smallest units of matter.",
    questions: [
      { question: "What charge do protons have?", options: ["+", "-", "0"], answer: "+" }
    ],
    unlocks: "bonding"
  },
  bonding: {
    title: "Chemistry - Bonding",
    lesson: "Bonding holds atoms together.",
    questions: [
      { question: "Ionic bonding occurs between?", options: ["Metals & Non-metals", "Non-metals", "Metals"], answer: "Metals & Non-metals" }
    ],
    unlocks: "energy"
  },
  energy: {
    title: "Physics - Energy",
    lesson: "Energy can be stored in various forms.",
    questions: [
      { question: "Which is a renewable source?", options: ["Coal", "Wind", "Gas", "Oil"], answer: "Wind" }
    ],
    unlocks: "forces"
  },
  forces: {
    title: "Physics - Forces",
    lesson: "Forces change motion.",
    questions: [
      { question: "What slows objects in air?", options: ["Gravity", "Air resistance", "Friction", "Magnetism"], answer: "Air resistance" }
    ],
    unlocks: null
  }
};

export default function LessonPage() {
  const router = useRouter();
  const { id } = router.query;
  const [xp, setXp] = useState(0);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const data = lessons[id];

  useEffect(() => {
    const storedXp = parseInt(localStorage.getItem('xp') || '0', 10);
    setXp(storedXp);
  }, []);

  const handleAnswer = (option) => {
    const correct = data.questions[step].answer;
    if (option === correct) {
      const newScore = score + 1;
      setScore(newScore);
      const newXp = xp + 10;
      localStorage.setItem('xp', newXp.toString());
      setXp(newXp);
      alert('Correct! +10 XP');
    } else {
      alert('Incorrect!');
    }

    if (step < data.questions.length - 1) {
      setStep(step + 1);
    } else {
      alert(`Lesson Complete! Score: ${score + 1}/${data.questions.length}`);
      const unlocked = JSON.parse(localStorage.getItem('unlocked') || '{}');
      if (data.unlocks) unlocked[data.unlocks] = true;
      localStorage.setItem('unlocked', JSON.stringify(unlocked));
      router.push('/');
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      <p className="mb-4">{data.lesson}</p>
      <h2 className="font-semibold mb-2">Question {step + 1}:</h2>
      <p className="mb-2">{data.questions[step].question}</p>
      <div className="flex flex-col gap-2">
        {data.questions[step].options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
