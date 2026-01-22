const BASE = import.meta.env.VITE_NEWS_API_BASE_URL as string;

export type NewsListItem = {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
};

export type NewsDetail = NewsListItem & {
  content: string;
};

type ApiOk<T> = { ok: true; data: T };
type ApiErr = { ok?: false; error?: string };
type ApiResponse<T> = ApiOk<T> & Partial<ApiErr> | ApiErr;

export async function fetchNewsList(): Promise<NewsListItem[]> {
  const res = await fetch(`${BASE}?route=berita&action=list`);
  const json = (await res.json()) as ApiResponse<NewsListItem[]>;

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (!("ok" in json) || !json.ok) throw new Error((json as any)?.error || "Failed to load news list");

  return Array.isArray((json as any).data) ? (json as any).data : [];
}

export async function fetchNewsDetail(id: string | number): Promise<NewsDetail> {
  const res = await fetch(
    `${BASE}?route=berita&action=detail&id=${encodeURIComponent(String(id))}`
  );
  const json = (await res.json()) as ApiResponse<NewsDetail>;

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (!("ok" in json) || !json.ok) throw new Error((json as any)?.error || "Failed to load news detail");

  return (json as any).data;
}
