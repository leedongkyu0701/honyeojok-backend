import * as dotenv from 'dotenv';
import { writeFile } from 'node:fs/promises';
import { addresses } from './address';
import path from 'node:path';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

interface KakaoAddressDocument {
  x: string; // longitude
  y: string; // latitude
  address_name: string;
}

interface KakaoAddressResponse {
  documents: KakaoAddressDocument[];
}

type Geo = { lat: number; lng: number };
type GeoResult = { slug: string; lat: number | null; lng: number | null };

console.log('KAKAO_CLIENT_ID=', process.env.KAKAO_CLIENT_ID);
console.log('cwd=', process.cwd());

const KEY = process.env.KAKAO_CLIENT_ID!;
if (!KEY) throw new Error('KAKAO_CLIENT_ID missing');

async function geocode(query: string): Promise<Geo | null> {
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

  return { lat: Number(first.y), lng: Number(first.x) };
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const results: GeoResult[] = [];

  for (const item of addresses) {
    const geo = await geocode(item.address);

    if (!geo) {
      console.log('❌', item.slug);
      console.log('   Address:', item.address);
      results.push({ slug: item.slug, lat: null, lng: null });
    } else {
      console.log('✅', item.slug);
      results.push({ slug: item.slug, ...geo });
    }

    await sleep(150);
  }

  // ✅ 파일 저장
  const outPath: string = path.join(__dirname, 'geo.json');
  await writeFile(outPath, JSON.stringify(results, null, 2), 'utf-8');

  console.log(`\nSaved: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
