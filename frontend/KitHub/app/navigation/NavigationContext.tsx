import React, { createContext, useContext, useState, ReactNode } from 'react';

type RouteParams = {
  [key: string]: any;
};

interface NavigationContextType {
  currentRoute: string;
  params: RouteParams;
  navigate: (route: string, params?: RouteParams) => void;
  back: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [params, setParams] = useState<RouteParams>({});
  const [history, setHistory] = useState<string[]>(['/']);

  const navigate = (route: string, newParams?: RouteParams) => {
    setHistory(prev => [...prev, route]);
    setCurrentRoute(route);
    setParams(newParams || {});
  };

  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousRoute = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentRoute(previousRoute);
      setParams({});
    }
  };

  return (
    <NavigationContext.Provider value={{ currentRoute, params, navigate, back }}>
      {children}
    </NavigationContext.Provider>
  );
}

// Mimic Expo Router's useRouter hook
export function useRouter() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useRouter must be used within NavigationProvider');
  }

  return {
    push: (route: string, params?: RouteParams) => context.navigate(route, params),
    replace: (route: string, params?: RouteParams) => context.navigate(route, params),
    back: () => context.back(),
    canGoBack: () => true,
  };
}

// Mimic Expo Router's useLocalSearchParams hook
export function useLocalSearchParams<T = RouteParams>(): T {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useLocalSearchParams must be used within NavigationProvider');
  }
  return context.params as T;
}

export function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationContext must be used within NavigationProvider');
  }
  return context;
}
