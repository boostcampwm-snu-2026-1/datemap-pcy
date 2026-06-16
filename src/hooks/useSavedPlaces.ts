'use client';

import { useQuery } from '@tanstack/react-query';
import type { Place } from '@/types';
import { localSavedPlaces } from '@/lib/localSavedStore';

export function useSavedPlaces(userId: string | undefined) {
  return useQuery<Place[]>({
    queryKey: ['saved-places', userId],
    queryFn: () => [...localSavedPlaces],
    staleTime: 0,
    enabled: !!userId,
  });
}
