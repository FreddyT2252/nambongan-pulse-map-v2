const BASE = import.meta.env.VITE_NEWS_API_BASE_URL as string;
console.log("NEWS_API_BASE:", BASE);

export type NewsListItem = {
  id: number;
  title: string;
  author?: string; // ✅ tambahan
  date: string;
  category: string;
  excerpt: string;
  photoLinks?: string[];
};

export type NewsDetail = NewsListItem & {
  content: string;
};

type ApiOk<T> = { ok: true; data: T };
type ApiErr = { ok?: false; error?: string };
type ApiResponse<T> = ApiOk<T> & Partial<ApiErr> | ApiErr;

async function parseJsonOrThrow<T>(res: Response) {
  const ct = res.headers.get("content-type") || "";
  const text = await res.text();

  console.log("FETCH RES URL:", res.url);
  console.log("FETCH CT:", ct);

  if (!ct.includes("application/json")) {
    throw new Error(`Non-JSON response (ct=${ct}). Potongan: ${text.slice(0, 200)}`);
  }

  return JSON.parse(text) as T;
}

export async function fetchNewsList(): Promise<NewsListItem[]> {
  const url = `${BASE}?route=berita&action=list`;
  console.log("FETCH LIST URL:", url);

  const res = await fetch(url);
  const json = await parseJsonOrThrow<ApiResponse<NewsListItem[]>>(res);

  if (!json?.ok) throw new Error((json as any)?.error || "Failed to load news list");
  return Array.isArray((json as any).data) ? (json as any).data : [];
}

export async function fetchNewsDetail(id: string | number): Promise<NewsDetail> {
  const url = `${BASE}?route=berita&action=detail&id=${encodeURIComponent(String(id))}`;
  console.log("FETCH DETAIL URL:", url);

  const res = await fetch(url);
  const json = await parseJsonOrThrow<ApiResponse<NewsDetail>>(res);

  if (!json?.ok) throw new Error((json as any)?.error || "Failed to load news detail");
  return (json as any).data;
}
