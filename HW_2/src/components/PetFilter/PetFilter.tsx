import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { SpeciesType } from '../PetCard/types';

interface PetFilterProps {
  selectedSpecies: SpeciesType | 'all';
  onSpeciesChange: (species: SpeciesType | 'all') => void;
  availableSpecies: SpeciesType[];
}

export const PetFilter = ({
  selectedSpecies,
  onSpeciesChange,
  availableSpecies,
}: PetFilterProps) => {
  const handleChange = (event: SelectChangeEvent<SpeciesType | 'all'>) => {
    onSpeciesChange(event.target.value as SpeciesType | 'all');
  };

  return (
    <FormControl
      sx={{
        minWidth: 200,
        '& .MuiOutlinedInput-root': {
          background: 'rgba(0, 255, 255, 0.05)',
          '& fieldset': {
            borderColor: '#00ffff',
            borderWidth: 2,
          },
          '&:hover fieldset': {
            borderColor: '#00ffff',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ff00ff',
            boxShadow: '0 0 15px rgba(255, 0, 255, 0.5)',
          },
        },
        '& .MuiInputLabel-root': {
          color: '#00ffff',
          '&.Mui-focused': {
            color: '#ff00ff',
          },
        },
        '& .MuiSelect-icon': {
          color: '#00ffff',
        },
      }}
    >
      <InputLabel id="species-filter-label">Filter by Species</InputLabel>
      <Select
        labelId="species-filter-label"
        id="species-filter"
        value={selectedSpecies}
        label="Filter by Species"
        onChange={handleChange}
        sx={{
          color: '#fff',
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)',
              color: '#fff',
              border: '2px solid #00ffff',
              '& .MuiMenuItem-root': {
                '&:hover': {
                  background: 'rgba(0, 255, 255, 0.1)',
                },
                '&.Mui-selected': {
                  background: 'rgba(255, 0, 255, 0.2)',
                  '&:hover': {
                    background: 'rgba(255, 0, 255, 0.3)',
                  },
                },
              },
            },
          },
        }}
      >
        <MenuItem value="all">
          <em>All Species</em>
        </MenuItem>
        {availableSpecies.map((species) => (
          <MenuItem key={species} value={species}>
            {species}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
