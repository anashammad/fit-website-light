const PAYLOAD_URL = process.env.PAYLOAD_CMS_URL || '';
const PAYLOAD_API_KEY = process.env.PAYLOAD_API_KEY;

const EMPTY_COLLECTION = {
  docs: [],
  totalDocs: 0,
  totalPages: 0,
  page: 1,
  hasNextPage: false,
  hasPrevPage: false,
};

interface CollectionResponse<T> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface FetchParams {
  where?: Record<string, unknown>;
  sort?: string;
  limit?: number;
  page?: number;
  depth?: number;
}

interface FetchOptions {
  revalidate?: number | false;
  tags?: string[];
}

function buildQueryString(params?: FetchParams): string {
  const searchParams = new URLSearchParams();
  if (!params) return '';

  if (params.sort) searchParams.set('sort', params.sort);
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.page) searchParams.set('page', String(params.page));
  if (params.depth) searchParams.set('depth', String(params.depth));
  if (params.where) {
    for (const [key, value] of Object.entries(params.where)) {
      searchParams.set(`where[${key}][equals]`, String(value));
    }
  }

  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

export async function getCollection<T>(
  collection: string,
  params?: FetchParams,
  options?: FetchOptions
): Promise<CollectionResponse<T>> {
  if (!PAYLOAD_URL) {
    return EMPTY_COLLECTION as CollectionResponse<T>;
  }

  try {
    const res = await fetch(
      `${PAYLOAD_URL}/api/${collection}${buildQueryString(params)}`,
      {
        headers: {
          ...(PAYLOAD_API_KEY
            ? { Authorization: `Bearer ${PAYLOAD_API_KEY}` }
            : {}),
        },
        next: {
          revalidate: options?.revalidate ?? false,
          tags: options?.tags,
        },
      }
    );

    if (!res.ok) {
      console.error(`CMS returned ${res.status} for collection: ${collection}`);
      return EMPTY_COLLECTION as CollectionResponse<T>;
    }

    return res.json();
  } catch (error) {
    console.error(`Failed to fetch collection "${collection}":`, error);
    return EMPTY_COLLECTION as CollectionResponse<T>;
  }
}

export async function getGlobal<T>(
  slug: string,
  options?: FetchOptions
): Promise<T> {
  if (!PAYLOAD_URL) {
    return {} as T;
  }

  try {
    const res = await fetch(`${PAYLOAD_URL}/api/globals/${slug}`, {
      headers: {
        ...(PAYLOAD_API_KEY
          ? { Authorization: `Bearer ${PAYLOAD_API_KEY}` }
          : {}),
      },
      next: {
        revalidate: options?.revalidate ?? false,
        tags: options?.tags,
      },
    });

    if (!res.ok) {
      console.error(`CMS returned ${res.status} for global: ${slug}`);
      return {} as T;
    }

    return res.json();
  } catch (error) {
    console.error(`Failed to fetch global "${slug}":`, error);
    return {} as T;
  }
}
