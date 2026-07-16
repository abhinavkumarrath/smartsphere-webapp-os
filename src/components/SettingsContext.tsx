import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';

type ColorTheme = 'cyber-cyan' | 'hacker-green' | 'synthwave-pink' | 'retro-amber';

interface SettingsContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  crtEnabled: boolean;
  setCrtEnabled: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>('cyber-cyan');
  const [crtEnabled, setCrtEnabled] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorTheme);
  }, [colorTheme]);

  return (
    <SettingsContext.Provider value={{ colorTheme, setColorTheme, crtEnabled, setCrtEnabled }}>
      {children}
      {crtEnabled && <div className="crt-overlay" />}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
