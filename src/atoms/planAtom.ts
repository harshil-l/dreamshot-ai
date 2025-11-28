
import { atom } from "jotai";
import { Plan } from "@/types";

// Atom to hold the plans array or undefined initially
export const plansAtom = atom<Plan[] | undefined>(undefined);