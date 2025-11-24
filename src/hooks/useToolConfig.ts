import { useContext } from 'react';
import { ToolConfigJson } from '@/config/tools.server';
import { ToolContext } from '@/contexts/ToolContext';

/**
 * Hook to access tool configuration from context
 * Returns null if not on a dynamic tool page
 */
export function useToolConfig(): ToolConfigJson | null {
    const context = useContext(ToolContext);
    return context?.toolConfig || null;
}

