'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/useAuthStore';
import { localSavedPlaces } from '@/lib/localSavedStore';
import type { Place } from '@/types';

export function useSaveMutation() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: async (place: Place) => {
      const idx = localSavedPlaces.findIndex((p) => p.id === place.id);
      if (idx >= 0) {
        localSavedPlaces.splice(idx, 1);
      } else {
        localSavedPlaces.push(place);
      }
      return [...localSavedPlaces];
    },
    onMutate: async (place) => {
      const key = ['saved-places', user?.id];
      await queryClient.cancelQueries({ queryKey: key });
      const prev = queryClient.getQueryData<Place[]>(key) ?? [];
      const next = prev.some((p) => p.id === place.id)
        ? prev.filter((p) => p.id !== place.id)
        : [...prev, place];
      queryClient.setQueryData(key, next);
      return { prev };
    },
    onError: (_err, _place, ctx) => {
      if (ctx?.prev !== undefined && user?.id) {
        queryClient.setQueryData(['saved-places', user.id], ctx.prev);
      }
    },
    onSettled: () => {
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: ['saved-places', user.id] });
      }
    },
  });
}
