import { useEffect, useRef, Dispatch } from 'react';
import { MoodType, PetAction } from '../components/PetCard/types';

interface UsePetLifecycleProps {
  energy: number;
  dispatch: Dispatch<PetAction>;
  intervalSeconds?: number;
}

interface UsePetLifecycleReturn {
  currentMood: MoodType;
}

export const usePetLifecycle = ({
  energy,
  dispatch,
  intervalSeconds = 5,
}: UsePetLifecycleProps): UsePetLifecycleReturn => {
  const previousEnergyRef = useRef(energy);

  // Вычисление настроения на основе энергии
  const getMoodFromEnergy = (energyLevel: number): MoodType => {
    if (energyLevel === 0) return 'dead';
    if (energyLevel <= 20) return 'sad';
    if (energyLevel <= 40) return 'tired';
    if (energyLevel <= 60) return 'neutral';
    return 'happy';
  };

  const currentMood = getMoodFromEnergy(energy);

  // Таймер для уменьшения энергии
  useEffect(() => {
    // Не уменьшаем энергию, если питомец уже "мёртв"
    if (energy === 0) return;

    const timer = setInterval(() => {
      dispatch({
        type: 'FEED',
        payload: { energy: -10 }, // Уменьшаем энергию на 10
      });
    }, intervalSeconds * 1000);

    return () => {
      clearInterval(timer);
    };
  }, [energy, dispatch, intervalSeconds]);

  // Обновление настроения при изменении энергии
  useEffect(() => {
    if (previousEnergyRef.current !== energy) {
      const newMood = getMoodFromEnergy(energy);

      // Обновляем настроение только если оно изменилось
      if (newMood !== currentMood) {
        dispatch({
          type: 'CHEER',
          payload: { mood: newMood },
        });
      }

      previousEnergyRef.current = energy;
    }
  }, [energy, currentMood, dispatch]);

  return { currentMood };
};
