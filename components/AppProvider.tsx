"use client";

import React, { createContext, useContext, useState, useEffect, useSyncExternalStore } from 'react';

export type Language = 'ne' | 'en';
export type Theme = 'light' | 'dark';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  pathname: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Subscribe function for SSR hydration safety
function subscribe() {
  return () => {};
}

export function AppProvider({ children, initialLang = 'ne' }: { children: React.ReactNode, initialLang?: Language }) {
  // Use state initialized from URL param (SSR) but can be updated client-side
  const [lang, setLangState] = useState<Language>(initialLang);
  const [theme, setTheme] = useState<Theme>('light');
  const [pathname, setPathname] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setLangState(initialLang);
  }, [initialLang]);

  // Initialize theme from localStorage and pathname
  useEffect(() => {
    setPathname(window.location.pathname);
    
    const handlePopState = () => {
      setPathname(window.location.pathname);
      // Update language from URL when navigating
      const pathParts = window.location.pathname.split('/');
      if (pathParts[1] === 'en' || pathParts[1] === 'ne') {
        setLangState(pathParts[1] as Language);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
    setIsInitialized(true);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Use useSyncExternalStore for SSR hydration safety
  const langValue = useSyncExternalStore(
    subscribe,
    () => lang,
    () => initialLang
  );

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newTheme;
    });
  };

  // Smooth language change without page reload - updates URL silently
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    // Update URL without full reload using history API
    const url = new URL(window.location.href);
    const pathParts = url.pathname.split('/');
    const hash = url.hash; // Preserve any hash (#contact, etc.)
    // Keep first empty string, replace language segment
    if (pathParts[1] === 'en' || pathParts[1] === 'ne') {
      pathParts[1] = newLang;
    } else {
      pathParts.splice(1, 0, newLang);
    }
    url.pathname = pathParts.join('/');
    url.search = ''; // Clear any query params
    url.hash = ''; // Clear hash to prevent it from being preserved incorrectly
    window.history.pushState({}, '', url.toString());
    setPathname(url.pathname);
  };

  // Expose both context value and raw state for different use cases
  const contextValue = {
    lang: langValue,
    setLang,
    theme,
    toggleTheme,
    pathname,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
