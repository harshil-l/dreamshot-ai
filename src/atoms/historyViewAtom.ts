import { atom } from "jotai";
import { GenerationHistory } from "@/types/history";

/**
 * Atom to store the currently selected generation for viewing in dialog
 */
export const historyViewAtom = atom<GenerationHistory | null>(null);


