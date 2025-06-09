"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Tipo del contexto
type BackgroundImgContextType = {
  backgroundImg: string | null;
  setBackgroundImg: Dispatch<SetStateAction<string | null>>;
};

// Valor por defecto solo para evitar errores en tiempo de compilación
const BackgroundImgContext = createContext<
  BackgroundImgContextType | undefined
>(undefined);

// Provider
export const BackgroundImgProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [backgroundImg, setBackgroundImg] = useState<string | null>(null);

  return (
    <BackgroundImgContext.Provider value={{ backgroundImg, setBackgroundImg }}>
      {children}
    </BackgroundImgContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useBackgroundImg = (): BackgroundImgContextType => {
  const context = useContext(BackgroundImgContext);

  if (!context) {
    throw new Error(
      "useBackgroundImg debe usarse dentro de un BackgroundImgProvider",
    );
  }

  return context;
};
