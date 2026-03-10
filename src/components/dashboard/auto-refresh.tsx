'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function AutoRefresh({ intervalMs = 5000, trainingModelIds = [] }: { intervalMs?: number, trainingModelIds?: string[] }) {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      // MOCK FLOW: Auto-complete training models by calling the mock status endpoint
      // Only runs if there are models currently training
      if (trainingModelIds.length > 0) {
        for (const modelId of trainingModelIds) {
          try {
            await fetch('/api/mock/update-status', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ modelId })
            });
          } catch (e) {
            console.error('Mock update failed', e);
          }
        }
      }
      
      router.refresh();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [router, intervalMs, trainingModelIds]);

  return null;
}
