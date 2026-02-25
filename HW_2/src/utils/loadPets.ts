import { Pet } from '../components/PetCard/types';
import petsData from '../data/pets.json';

export const loadPets = async (delayMs: number = 2000): Promise<Pet[]> => {
  // Имитация загрузки данных с API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(petsData as Pet[]);
    }, delayMs);
  });
};
