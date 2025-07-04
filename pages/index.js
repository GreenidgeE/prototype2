
import SkillTree from '../components/SkillTree';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-4">Prototype 3 - Combined Science</h1>
        <SkillTree />
      </main>
    </div>
  );
}
