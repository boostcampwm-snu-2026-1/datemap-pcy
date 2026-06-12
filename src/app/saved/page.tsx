'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useSavedPlaces } from '@/hooks/useSavedPlaces';
import { PlaceCard, PlaceCardSkeleton } from '@/components/PlaceCard';
import { AuthModal } from '@/components/AuthModal';

export default function SavedPage() {
  const user = useAuthStore((s) => s.user);
  const [showModal, setShowModal] = useState(false);
  const { data: savedPlaces = [], isLoading } = useSavedPlaces(user?.id);

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen max-w-sm mx-auto bg-white">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
          <p className="text-gray-400 text-sm text-center">
            로그인하면 저장한 장소를 볼 수 있어요.
          </p>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gray-900 text-white font-bold text-[14px] rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            로그인하기
          </button>
        </div>
        <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen max-w-sm mx-auto bg-white">
        <Header />
        <div className="px-4 pt-2 space-y-2.5">
          {Array.from({ length: 4 }).map((_, i) => <PlaceCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen max-w-sm mx-auto bg-white">
      <Header count={savedPlaces.length} />

      {savedPlaces.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-2">
          <p className="text-gray-900 font-bold text-[16px]">저장한 장소가 없어요</p>
          <p className="text-gray-400 text-sm text-center">마음에 드는 장소를 저장해보세요.</p>
          <Link
            href="/"
            className="mt-3 px-6 py-3 bg-gray-900 text-white font-bold text-[14px] rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            홈으로 가기
          </Link>
        </div>
      ) : (
        <div className="px-4 pt-2 pb-32 space-y-2.5">
          {savedPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} regionId={place.region_id} />
          ))}
        </div>
      )}

      {/* 코스 만들기 — Feature 7 코스 API 구현 후 활성화 */}
      {savedPlaces.length >= 2 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 py-4 bg-white/90 backdrop-blur-sm border-t border-gray-100 z-30">
          <button
            type="button"
            disabled
            className="w-full py-3.5 bg-gray-900 text-white font-bold text-[15px] rounded-2xl opacity-40 cursor-not-allowed outline-none"
          >
            코스 만들기 · {savedPlaces.length}곳
          </button>
        </div>
      )}
    </div>
  );
}

function Header({ count }: { count?: number }) {
  return (
    <div className="px-5 pt-6 pb-4 flex items-center gap-3">
      <Link
        href="/"
        className="text-gray-400 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
      >
        ← 홈
      </Link>
      <h1 className="text-[18px] font-black text-gray-900">
        저장한 장소{count !== undefined && count > 0 ? ` ${count}` : ''}
      </h1>
    </div>
  );
}
