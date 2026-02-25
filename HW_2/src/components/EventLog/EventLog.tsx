import { useEffect, useRef } from 'react';
import {
  Drawer,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Divider,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useEventLog } from '../../hooks/useEventLog';

interface EventLogProps {
  open: boolean;
  onClose: () => void;
}

export const EventLog = ({ open, onClose }: EventLogProps) => {
  const { events, clearEvents } = useEventLog();
  const listEndRef = useRef<HTMLDivElement>(null);

  // Автоскролл к последнему событию
  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [events]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
          color: '#fff',
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          background: 'transparent',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: '2px solid #00ffff',
            background: 'rgba(0, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EventNoteIcon sx={{ color: '#00ffff' }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#00ffff',
                textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
              }}
            >
              Event Log
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: '#ff00ff',
              '&:hover': {
                background: 'rgba(255, 0, 255, 0.1)',
              },
            }}
          >
            ✕
          </IconButton>
        </Box>

        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#a0a0a0',
            }}
          >
            Total events: {events.length}
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={clearEvents}
            disabled={events.length === 0}
            sx={{
              background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #ff5555 0%, #dd0000 100%)',
              },
              '&:disabled': {
                background: '#333',
                color: '#666',
              },
            }}
          >
            Clear Log
          </Button>
        </Box>

        <Divider sx={{ borderColor: 'rgba(0, 255, 255, 0.2)' }} />

        <List
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 0,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0, 0, 0, 0.2)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 255, 255, 0.3)',
              borderRadius: '4px',
              '&:hover': {
                background: 'rgba(0, 255, 255, 0.5)',
              },
            },
          }}
        >
          {events.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: 2,
                opacity: 0.5,
              }}
            >
              <EventNoteIcon sx={{ fontSize: 64, color: '#666' }} />
              <Typography variant="body1" sx={{ color: '#666' }}>
                No events yet
              </Typography>
            </Box>
          ) : (
            events.map((event, index) => (
              <ListItem
                key={index}
                sx={{
                  borderBottom: '1px solid rgba(0, 255, 255, 0.1)',
                  transition: 'background 0.2s ease',
                  '&:hover': {
                    background: 'rgba(0, 255, 255, 0.05)',
                  },
                  animation: 'fadeIn 0.3s ease',
                  '@keyframes fadeIn': {
                    from: {
                      opacity: 0,
                      transform: 'translateX(20px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateX(0)',
                    },
                  },
                }}
              >
                <ListItemText
                  primary={event}
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                      color: '#e0e0e0',
                      '& [*]': {
                        color: '#00ffff',
                        fontWeight: 'bold',
                      },
                    },
                  }}
                />
              </ListItem>
            ))
          )}
          <div ref={listEndRef} />
        </List>
      </Paper>
    </Drawer>
  );
};
