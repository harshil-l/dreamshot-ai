'use client';

import { createContext, type ReactNode } from 'react';
import { ToolConfigJson } from '@/config/tools.server';

interface ToolContextValue {
    toolConfig: ToolConfigJson | null;
}

export const ToolContext = createContext<ToolContextValue | undefined>(undefined);

interface ToolProviderProps {
    children: ReactNode;
    toolConfig: ToolConfigJson | null;
}

/**
 * Provider component that supplies tool configuration data to child components
 * Used on dynamic tool pages to pass JSON data to components
 */
export function ToolProvider({ children, toolConfig }: ToolProviderProps) {
    return (
        <ToolContext.Provider value={{ toolConfig }}>
            {children}
        </ToolContext.Provider>
    );
}
