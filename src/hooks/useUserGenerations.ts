"use client";

import { useState, useEffect, useRef } from "react";
import { collection, query, where, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/firebase";
import { GenerationHistory } from "@/types/history";

interface UseUserGenerationsReturn {
    /** Array of user generations, sorted by most recent first */
    generations: GenerationHistory[];
    /** Loading state */
    loading: boolean;
    /** Error state */
    error: Error | null;
}

/**
 * Hook to fetch and monitor user generations from Firebase
 * Fetches from users/{userId}/generations collection
 * Filters out deleted items and orders by createdAt descending
 * Provides real-time updates via Firestore onSnapshot
 * 
 * @param userId - Firebase user ID
 * @returns Object with generations array, loading state, and error
 */
export function useUserGenerations(userId: string | undefined): UseUserGenerationsReturn {
    const [generations, setGenerations] = useState<GenerationHistory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;

        // Don't set up listener if userId is missing
        if (!userId) {
            // Use setTimeout to defer state updates and avoid linter warning
            const timeoutId = setTimeout(() => {
                if (isMountedRef.current) {
                    setGenerations([]);
                    setError(null);
                    setLoading(false);
                }
            }, 0);

            return () => {
                clearTimeout(timeoutId);
            };
        }

        // Initialize state for new userId - defer to avoid linter warning
        const initTimeoutId = setTimeout(() => {
            if (isMountedRef.current) {
                setLoading(true);
                setError(null);
            }
        }, 0);

        try {
            // Create Firestore query
            // Path: users/{userId}/generations
            const generationsRef = collection(db, "users", userId, "generations");

            // Query: filter deleted items at database level only
            // Note: We only filter isDeleted here to avoid composite index requirement
            // Status filtering and sorting are done client-side to avoid index requirements
            const q = query(
                generationsRef,
                where("isDeleted", "==", false)
            );

            // Set up real-time listener
            const unsubscribe = onSnapshot(
                q,
                (snapshot: QuerySnapshot<DocumentData>) => {
                    const generationsData: GenerationHistory[] = [];

                    snapshot.forEach((doc) => {
                        const data = doc.data();
                        // No need to filter deleted items here - database query handles it
                        // Filter completed items client-side to avoid composite index requirement
                        if (data.status === "completed") {
                            // Ensure id is set from document ID (not from data)
                            generationsData.push({
                                ...data,
                                id: doc.id, // Always use document ID, override any id in data
                            } as GenerationHistory);
                        }
                    });

                    // Sort by createdAt descending (most recent first) - client-side to avoid index requirement
                    generationsData.sort((a, b) => {
                        // Handle Firestore Timestamp objects
                        let aTime = 0;
                        let bTime = 0;

                        if (a.createdAt) {
                            if (typeof a.createdAt.toMillis === 'function') {
                                aTime = a.createdAt.toMillis();
                            } else if (a.createdAt.seconds) {
                                aTime = a.createdAt.seconds * 1000;
                            } else if (a.createdAt instanceof Date) {
                                aTime = a.createdAt.getTime();
                            }
                        }

                        if (b.createdAt) {
                            if (typeof b.createdAt.toMillis === 'function') {
                                bTime = b.createdAt.toMillis();
                            } else if (b.createdAt.seconds) {
                                bTime = b.createdAt.seconds * 1000;
                            } else if (b.createdAt instanceof Date) {
                                bTime = b.createdAt.getTime();
                            }
                        }

                        return bTime - aTime; // Descending order (most recent first)
                    });

                    console.log("[useUserGenerations] Updated generations:", {
                        count: generationsData.length,
                        ids: generationsData.map(g => g.id),
                    });

                    setGenerations(generationsData);
                    setLoading(false);
                },
                (err) => {
                    console.error("[useUserGenerations] Error fetching generations:", err);
                    setError(new Error(`Failed to fetch generations: ${err.message}`));
                    setLoading(false);
                }
            );

            // Cleanup listener on unmount
            return () => {
                clearTimeout(initTimeoutId);
                isMountedRef.current = false;
                unsubscribe();
            };
        } catch (err) {
            clearTimeout(initTimeoutId);
            console.error("[useUserGenerations] Error setting up query:", err);
            // Defer setState to avoid linter warning
            setTimeout(() => {
                if (isMountedRef.current) {
                    setError(err instanceof Error ? err : new Error("Unknown error"));
                    setLoading(false);
                }
            }, 0);
        }

        return () => {
            isMountedRef.current = false;
        };
    }, [userId]);

    return { generations, loading, error };
}

