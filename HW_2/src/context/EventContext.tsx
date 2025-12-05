import { createContext, useState, ReactNode, useCallback, useMemo } from 'react';

export interface EventContextType {
  events: string[];
  addEvent: (event: string) => void;
  clearEvents: () => void;
}

export const EventContext = createContext<EventContextType | undefined>(undefined);

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider = ({ children }: EventProviderProps) => {
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = useCallback((event: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const eventWithTime = `[${timestamp}] ${event}`;
    setEvents((prev) => [...prev, eventWithTime]);
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  const value: EventContextType = useMemo(() => ({
    events,
    addEvent,
    clearEvents,
  }), [events, addEvent, clearEvents]);

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};
