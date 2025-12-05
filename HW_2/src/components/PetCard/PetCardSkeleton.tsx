import { Skeleton, Box } from '@mui/material';

export const PetCardSkeleton = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        border: '2px solid #0f3460',
        borderRadius: '16px',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #00ffff, #ff00ff, #ffff00)',
          opacity: 0.3,
        },
      }}
    >
      {/* Avatar skeleton */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Skeleton
          variant="circular"
          width={80}
          height={80}
          sx={{
            bgcolor: 'rgba(0, 255, 255, 0.1)',
          }}
        />
      </Box>

      {/* Name skeleton */}
      <Skeleton
        variant="text"
        sx={{
          fontSize: '1.5rem',
          bgcolor: 'rgba(0, 255, 255, 0.1)',
          mb: 1,
        }}
      />

      {/* Species skeleton */}
      <Skeleton
        variant="text"
        width="60%"
        sx={{
          fontSize: '0.9rem',
          bgcolor: 'rgba(0, 255, 255, 0.1)',
          mb: 0.5,
        }}
      />

      {/* Mood skeleton */}
      <Skeleton
        variant="text"
        width="50%"
        sx={{
          fontSize: '1rem',
          bgcolor: 'rgba(0, 255, 255, 0.1)',
          mb: 2,
        }}
      />

      {/* Energy bar skeleton */}
      <Box sx={{ mb: 1 }}>
        <Skeleton
          variant="text"
          width="30%"
          sx={{
            fontSize: '0.9rem',
            bgcolor: 'rgba(0, 255, 255, 0.1)',
            mb: 0.5,
          }}
        />
        <Skeleton
          variant="rectangular"
          height={8}
          sx={{
            borderRadius: '4px',
            bgcolor: 'rgba(0, 255, 255, 0.1)',
          }}
        />
      </Box>

      {/* Level skeleton */}
      <Skeleton
        variant="text"
        width="40%"
        sx={{
          fontSize: '0.9rem',
          bgcolor: 'rgba(0, 255, 255, 0.1)',
          mb: 2,
        }}
      />

      {/* Buttons skeleton */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
          mt: 2,
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={40}
            sx={{
              borderRadius: '8px',
              bgcolor: 'rgba(0, 255, 255, 0.1)',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
