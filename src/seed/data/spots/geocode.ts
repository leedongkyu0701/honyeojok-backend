import * as dotenv from 'dotenv';
import path from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { spots } from './index';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

type GeoRow = { lat: number; lng: number; address: string };
type GeoMap = Record<string, Record<string, GeoRow>>;

interface KakaoAddressDocument {
  x: string; // longitude
  y: string; // latitude
  address_name: string;
}
interface KakaoAddressResponse {
  documents: KakaoAddressDocument[];
}

const KEY = process.env.KAKAO_CLIENT_ID;
if (!KEY) throw new Error('KAKAO_CLIENT_ID missing');

const OUT_PATH = path.join(__dirname, 'geo.json');

async function loadExisting(): Promise<GeoMap> {
  try {
    const raw = await readFile(OUT_PATH, 'utf-8');
    return JSON.parse(raw) as GeoMap;
  } catch {
    return {};
  }
}

async function geocode(
  query: string,
): Promise<{ lat: number; lng: number; addressName: string } | null> {
  const url = new URL('https://dapi.kakao.com/v2/local/search/address.json');
  url.searchParams.set('query', query);

  const res = await fetch(url, {
    headers: { Authorization: `KakaoAK ${KEY}` },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Kakao API ${res.status} ${res.statusText} - ${text}`);
  }

  const data = (await res.json()) as KakaoAddressResponse;
  const first = data.documents?.[0];
  if (!first) return null;

  return {
    lat: Number(first.y),
    lng: Number(first.x),
    addressName: first.address_name,
  };
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const geoMap = await loadExisting();

  // 1) spots에서 address 있는 애들만 추출
  const targets = spots
    .filter((s) => typeof s.address === 'string' && s.address.trim().length > 0)
    .map((s) => ({
      regionSlug: s.regionSlug,
      slug: s.slug,
      address: s.address!.trim(),
    }));

  console.log('OUT_PATH:', OUT_PATH);

  // 2) 지오코딩 실행
  for (const t of targets) {
    geoMap[t.regionSlug] ??= {};

    // 이미 존재하면 스킵
    const prev = geoMap[t.regionSlug][t.slug];
    if (prev && Number.isFinite(prev.lat) && Number.isFinite(prev.lng)) {
      console.log('⏭️ skip', t.regionSlug, t.slug);
      continue;
    }

    const geo = await geocode(t.address);

    if (!geo) {
      console.log('❌', t.regionSlug, t.slug);
      console.log('   Address:', t.address);
      geoMap[t.regionSlug][t.slug] = { lat: NaN, lng: NaN, address: t.address };
    } else {
      console.log('✅', t.regionSlug, t.slug);
      geoMap[t.regionSlug][t.slug] = {
        lat: geo.lat,
        lng: geo.lng,
        address: geo.addressName || t.address,
      };
    }

    await sleep(150); // 레이트리밋 대비
  }

  // 4) geo.json 저장
  await writeFile(OUT_PATH, JSON.stringify(geoMap, null, 2), 'utf-8');
  console.log('\nSaved:', OUT_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
