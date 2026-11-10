import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const BookingContext = createContext({ open: () => {}, close: () => {}, isOpen: false, room: '' });

export function BookingProvider({ children }) {
  const [state, setState] = useState({ isOpen: false, room: '' });
  const open = useCallback((room = '') => setState({ isOpen: true, room }), []);
  const close = useCallback(() => setState((s) => ({ ...s, isOpen: false })), []);
  const value = useMemo(() => ({ ...state, open, close }), [state, open, close]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export const useBooking = () => useContext(BookingContext);
