import { useState, useEffect } from 'react';
import { EventProvider } from './context/EventContext';
import { useEventLog } from './hooks/useEventLog';
import { Dashboard } from './pages/Dashboard';
import { loadPets } from './utils/loadPets';
import { Pet } from './components/PetCard/types';

const AppContent = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const { addEvent } = useEventLog();

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const data = await loadPets(2000);
        setPets(data);
        addEvent('🌐 Cyber Zoo initialized - All systems online');
      } catch (error) {
        addEvent('❌ Error loading pets');
        console.error('Error loading pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePetAction = (petName: string, action: string) => {
    addEvent(`🤖 ${petName}: ${action}`);
  };

  return (
    <Dashboard pets={pets} loading={loading} onPetAction={handlePetAction} />
  );
};

function App() {
  return (
    <EventProvider>
      <AppContent />
    </EventProvider>
  );
}

export default App;
