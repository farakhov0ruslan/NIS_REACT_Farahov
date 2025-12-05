import { useState, useMemo } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Pet, SpeciesType } from '../components/PetCard/types';
import { PetFilter } from '../components/PetFilter/PetFilter';
import { PetCardSkeleton } from '../components/PetCard/PetCardSkeleton';
import { PetCard } from '../components/PetCard/PetCard';
import { EventLog } from '../components/EventLog/EventLog';

interface DashboardProps {
  pets: Pet[];
  loading: boolean;
  onPetAction: (petName: string, action: string) => void;
}

export const Dashboard = ({ pets, loading, onPetAction }: DashboardProps) => {
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesType | 'all'>('all');
  const [logOpen, setLogOpen] = useState(false);

  // Получаем уникальные виды питомцев
  const availableSpecies = useMemo(() => {
    const speciesSet = new Set<SpeciesType>();
    pets.forEach((pet) => speciesSet.add(pet.species));
    return Array.from(speciesSet).sort();
  }, [pets]);

  // Фильтруем питомцев с использованием useMemo
  const filteredPets = useMemo(() => {
    if (selectedSpecies === 'all') {
      return pets;
    }
    return pets.filter((pet) => pet.species === selectedSpecies);
  }, [pets, selectedSpecies]);

  return (
    <div style={{ padding: '2rem' }}>
      <div
        style={{
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: '2.5rem',
              background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
            }}
          >
            🌐 Cyber Zoo 2077
          </h1>
          <p
            style={{
              margin: '0.5rem 0 0 0',
              color: '#a0a0a0',
              fontSize: '1rem',
            }}
          >
            Manage your digital companions
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <PetFilter
            selectedSpecies={selectedSpecies}
            onSpeciesChange={setSelectedSpecies}
            availableSpecies={availableSpecies}
          />
          <IconButton
            onClick={() => setLogOpen(true)}
            sx={{
              background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(135deg, #00ffff 20%, #ff00ff 120%)',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      {!loading && (
        <div
          style={{
            marginBottom: '1rem',
            color: '#00ffff',
            fontSize: '1rem',
          }}
        >
          Showing {filteredPets.length} of {pets.length} pets
          {selectedSpecies !== 'all' && ` (filtered by: ${selectedSpecies})`}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {loading ? (
          // Показываем 6 skeleton loader'ов во время загрузки
          Array.from({ length: 6 }).map((_, index) => (
            <PetCardSkeleton key={index} />
          ))
        ) : (
          filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onAction={onPetAction} />
          ))
        )}
      </div>

      {!loading && filteredPets.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem',
            color: '#666',
          }}
        >
          <p style={{ fontSize: '3rem' }}>🔍</p>
          <p style={{ fontSize: '1.5rem' }}>No pets found</p>
          <p>Try selecting a different species</p>
        </div>
      )}

      <EventLog open={logOpen} onClose={() => setLogOpen(false)} />
    </div>
  );
};
