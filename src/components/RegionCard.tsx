'use client';

import Link from 'next/link';
import type { Region } from '@/types';

const REGION_GRADIENT: Record<string, string> = {
  seongsu: 'g-seongsu',
  hongdae: 'g-hongdae',
  gangnam: 'g-gangnam',
  itaewon: 'g-itaewon',
  yeonnam: 'g-yeonnam',
};

const TREND_LABEL: Record<Region['trend_direction'], string> = {
  up: '↑ 급상승',
  down: '↓ 하락',
  stable: '→ 유지',
};

const DARK_OVERLAY = 'linear-gradient(to top, rgba(0,0,0,0.65), transparent 55%)';
const DARK_OVERLAY_SUB = 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%)';

type RegionBigCardProps = {
  region: Region;
  rank: number;
};

type RegionSubCardProps = {
  region: Region;
  rank: number;
};

export function RegionBigCard({ region, rank }: RegionBigCardProps) {
  const gradient = REGION_GRADIENT[region.id] ?? 'g-seongsu';

  return (
    <Link href={`/region/${region.id}`}>
      <article
        className={`pressable ${gradient} rounded-[1.75rem] overflow-hidden shadow-md relative`}
        style={{ aspectRatio: '4/3' }}
      >
        {region.image_url && (
          <img
            src={region.image_url}
            alt={region.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0" style={{ background: DARK_OVERLAY }} />

        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className="bg-black/30 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full">
            🔥 {rank}위
          </span>
          <span className="bg-black/20 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-full">
            {TREND_LABEL[region.trend_direction]}
          </span>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <span className="text-white/50 text-[11px]">{region.place_count}곳</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <p className="text-white/60 text-[11px] font-medium tracking-[0.2em] uppercase mb-0.5">
            {region.district}
          </p>
          <h2 className="text-white text-[28px] font-black tracking-tight leading-none">
            {region.name}
          </h2>
        </div>
      </article>
    </Link>
  );
}

export function RegionSubCard({ region, rank }: RegionSubCardProps) {
  const gradient = REGION_GRADIENT[region.id] ?? 'g-seongsu';

  return (
    <Link href={`/region/${region.id}`} className="flex-shrink-0 w-32 pressable">
      <article
        className={`${gradient} rounded-2xl overflow-hidden shadow-md relative`}
        style={{ aspectRatio: '3/4' }}
      >
        {region.image_url && (
          <img
            src={region.image_url}
            alt={region.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0" style={{ background: DARK_OVERLAY_SUB }} />

        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="bg-black/25 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {rank}위
          </span>
        </div>
        <div className="absolute bottom-0 p-2.5 z-10">
          <p className="text-white text-sm font-black leading-tight">{region.name}</p>
          <p className="text-white/60 text-[10px] mt-0.5">{region.place_count}곳</p>
        </div>
      </article>
    </Link>
  );
}

// 스켈레톤
export function RegionBigCardSkeleton() {
  return (
    <div
      className="rounded-[1.75rem] bg-gray-100 animate-pulse"
      style={{ aspectRatio: '4/3' }}
    />
  );
}

export function RegionSubCardSkeleton() {
  return (
    <div
      className="flex-shrink-0 w-32 rounded-2xl bg-gray-100 animate-pulse"
      style={{ aspectRatio: '3/4' }}
    />
  );
}
