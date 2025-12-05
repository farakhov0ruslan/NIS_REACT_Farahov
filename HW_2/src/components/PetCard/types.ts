export type MoodType = 'happy' | 'neutral' | 'tired' | 'sad' | 'dead';

export type SpeciesType = 'cyber-cat' | 'cyber-dog' | 'robo-bird' | 'nano-fish' | 'quantum-fox' | 'digital-wolf';

export interface Pet {
  id: string;
  name: string;
  species: SpeciesType;
  mood: MoodType;
  energy: number;
  level: number;
  avatar: string;
}

export type ActionType = 'FEED' | 'LEVEL_UP' | 'CHEER' | 'RESET';

export interface PetAction {
  type: ActionType;
  payload?: Partial<Pet>;
}

export interface PetState {
  id: string;
  name: string;
  species: SpeciesType;
  mood: MoodType;
  energy: number;
  level: number;
  avatar: string;
  initialState: Pet;
}
