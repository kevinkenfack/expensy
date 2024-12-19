"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export function useSyncUser() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    async function syncUser() {
      if (isLoaded && user) {
        try {
          await fetch("/api/user/sync", {
            method: "POST",
          });
        } catch (error) {
          console.error("Erreur lors de la synchronisation de l'utilisateur:", error);
        }
      }
    }

    syncUser();
  }, [isLoaded, user]);
} 