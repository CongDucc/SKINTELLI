import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface RoutineItem {
  id: string;
  name: string;
  time: string;
  checked: boolean;
  image: any;
}

interface RoutineContextType {
  morningRoutines: RoutineItem[];
  eveningRoutines: RoutineItem[];
  addToMorningRoutine: (item: Omit<RoutineItem, 'id' | 'checked'>) => void;
  addToEveningRoutine: (item: Omit<RoutineItem, 'id' | 'checked'>) => void;
  toggleRoutineItem: (id: string, period: 'morning' | 'evening') => void;
  removeRoutineItem: (id: string, period: 'morning' | 'evening') => void;
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export const useRoutine = () => {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutine must be used within a RoutineProvider');
  }
  return context;
};

interface RoutineProviderProps {
  children: ReactNode;
}

export const RoutineProvider = ({ children }: RoutineProviderProps) => {
  const [morningRoutines, setMorningRoutines] = useState<RoutineItem[]>([
    {
      id: '1',
      name: 'SVR Sebiaclear Gel Moussant',
      time: '7:00 AM',
      checked: false,
      image: require('../../assets/products/SVR.jpg'),
    },
    {
      id: '2',
      name: 'Balance HA Serum',
      time: '7:05 AM',
      checked: false,
      image: require('../../assets/products/serum dưỡng ẫm balance HA.jpg'),
    },
    {
      id: '3',
      name: "Paula's Choice Sunscreen SPF 50",
      time: '7:10 AM',
      checked: false,
      image: require('../../assets/products/kem chống nắng paula choices.jpg'),
    },
  ]);

  const [eveningRoutines, setEveningRoutines] = useState<RoutineItem[]>([
    {
      id: '4',
      name: 'BHA Obagi CLENZIderm',
      time: '9:00 PM',
      checked: false,
      image: require('../../assets/products/BHA.jpg'),
    },
    {
      id: '5',
      name: "Paula's Choice Essence",
      time: '9:05 PM',
      checked: false,
      image: require('../../assets/products/tinh chất paula choices.jpg'),
    },
    {
      id: '6',
      name: 'Obagi Hydrate Moisturizer',
      time: '9:10 PM',
      checked: false,
      image: require('../../assets/products/kem dưỡng obagi.jpg'),
    },
  ]);

  const addToMorningRoutine = (item: Omit<RoutineItem, 'id' | 'checked'>) => {
    const newItem: RoutineItem = {
      ...item,
      id: `morning-${Date.now()}`,
      checked: false,
    };
    setMorningRoutines([...morningRoutines, newItem]);
  };

  const addToEveningRoutine = (item: Omit<RoutineItem, 'id' | 'checked'>) => {
    const newItem: RoutineItem = {
      ...item,
      id: `evening-${Date.now()}`,
      checked: false,
    };
    setEveningRoutines([...eveningRoutines, newItem]);
  };

  const toggleRoutineItem = (id: string, period: 'morning' | 'evening') => {
    if (period === 'morning') {
      setMorningRoutines(
        morningRoutines.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      );
    } else {
      setEveningRoutines(
        eveningRoutines.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      );
    }
  };

  const removeRoutineItem = (id: string, period: 'morning' | 'evening') => {
    if (period === 'morning') {
      setMorningRoutines(morningRoutines.filter((item) => item.id !== id));
    } else {
      setEveningRoutines(eveningRoutines.filter((item) => item.id !== id));
    }
  };

  return (
    <RoutineContext.Provider
      value={{
        morningRoutines,
        eveningRoutines,
        addToMorningRoutine,
        addToEveningRoutine,
        toggleRoutineItem,
        removeRoutineItem,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};
