import { useReducer, useCallback, useRef, useEffect, memo } from 'react';
import { Pet, PetAction, PetState } from './types';
import { usePetLifecycle } from '../../hooks/usePetLifecycle';
import { ActionButton } from '../PetActions/ActionButton.styled';
import styles from './PetCard.module.scss';

interface PetCardProps {
  pet: Pet;
  onAction: (petName: string, action: string) => void;
}

const petReducer = (state: PetState, action: PetAction): PetState => {
  switch (action.type) {
    case 'FEED': {
      // Если payload содержит отрицательное значение, это уменьшение энергии от таймера
      const energyChange = action.payload?.energy ?? 20;
      const newEnergy = Math.max(0, Math.min(100, state.energy + energyChange));
      return {
        ...state,
        energy: newEnergy,
      };
    }

    case 'LEVEL_UP':
      return {
        ...state,
        level: state.level + 1,
      };

    case 'CHEER':
      // Обновляем настроение (приходит из usePetLifecycle или пользовательское действие)
      return {
        ...state,
        mood: action.payload?.mood ?? 'happy',
      };

    case 'RESET':
      return {
        ...state,
        ...state.initialState,
      };

    default:
      return state;
  }
};

const PetCardComponent = ({ pet, onAction }: PetCardProps) => {
  const [state, dispatch] = useReducer(petReducer, {
    ...pet,
    initialState: pet,
  });

  const avatarRef = useRef<HTMLDivElement>(null);

  // Используем кастомный хук для жизненного цикла
  const { currentMood } = usePetLifecycle({
    energy: state.energy,
    dispatch,
    intervalSeconds: 5,
  });

  // Мемоизированные обработчики
  const handleFeed = useCallback(() => {
    dispatch({ type: 'FEED' });
    onAction(state.name, 'Fed');
  }, [state.name, onAction]);

  const handleLevelUp = useCallback(() => {
    dispatch({ type: 'LEVEL_UP' });
    onAction(state.name, 'Leveled up');
  }, [state.name, onAction]);

  const handleCheer = useCallback(() => {
    // Cheer повышает энергию на 10, что автоматически улучшит настроение
    dispatch({ type: 'FEED', payload: { energy: 10 } });
    onAction(state.name, 'Cheered (+10 energy)');
  }, [state.name, onAction]);

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' });
    onAction(state.name, 'Reset to initial state');
  }, [state.name, onAction]);

  // Эффект для анимации аватара при изменении настроения
  useEffect(() => {
    if (avatarRef.current) {
      avatarRef.current.style.transform = 'scale(1.2)';
      const timer = setTimeout(() => {
        if (avatarRef.current) {
          avatarRef.current.style.transform = 'scale(1)';
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [currentMood]);

  // Определяем цвет тени в зависимости от настроения (inline styles)
  const getShadowColor = () => {
    switch (currentMood) {
      case 'happy':
        return '0 0 20px rgba(0, 255, 255, 0.6)';
      case 'neutral':
        return '0 0 20px rgba(255, 255, 0, 0.4)';
      case 'tired':
        return '0 0 20px rgba(255, 165, 0, 0.5)';
      case 'sad':
        return '0 0 20px rgba(255, 0, 255, 0.5)';
      case 'dead':
        return '0 0 20px rgba(255, 0, 0, 0.7)';
      default:
        return '0 0 10px rgba(255, 255, 255, 0.3)';
    }
  };

  const cardStyle = {
    boxShadow: getShadowColor(),
  };

  const isDisabled = state.energy === 0;

  return (
    <div className={styles.petCard} style={cardStyle}>
      <div className={styles.avatarContainer}>
        <div
          ref={avatarRef}
          className={styles.avatar}
          style={{
            transition: 'transform 0.3s ease',
            filter: isDisabled ? 'grayscale(100%)' : 'none',
          }}
        >
          {state.avatar}
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{state.name}</h3>
        <p className={styles.species}>Species: {state.species}</p>
        <p className={styles.mood}>Mood: {currentMood}</p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span>Energy:</span>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${state.energy}%` }}
              />
            </div>
            <span>{state.energy}%</span>
          </div>
          <div className={styles.stat}>
            <span>Level: {state.level}</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <ActionButton
          variant="feed"
          onClick={handleFeed}
          disabled={isDisabled}
        >
          🍖 Feed
        </ActionButton>
        <ActionButton
          variant="levelUp"
          onClick={handleLevelUp}
          disabled={isDisabled}
        >
          ⬆️ Level Up
        </ActionButton>
        <ActionButton
          variant="cheer"
          onClick={handleCheer}
          disabled={isDisabled}
        >
          ✨ Cheer
        </ActionButton>
        <ActionButton
          variant="reset"
          onClick={handleReset}
        >
          🔄 Reset
        </ActionButton>
      </div>

      {isDisabled && (
        <div className={styles.disabledOverlay}>
          <p>⚠️ OFFLINE - Energy depleted!</p>
        </div>
      )}
    </div>
  );
};

export const PetCard = memo(PetCardComponent);
