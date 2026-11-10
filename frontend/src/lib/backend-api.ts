import { getAuthAccessToken } from '@/lib/supabase/auth';

const serverComponentAPIUrl = process.env.API_BASE_URL;

const clientComponentAPIUrl = process.env.NEXT_PUBLIC_API_URL;

type BackendAPIError = {
  message: string;
  detail?: unknown;
};

type BackendAPIResult<TResponseData> = {
  data: TResponseData | null;
  error: BackendAPIError | null;
  status: number | null;
};

async function backendAPIFetch<TRequestData, TResponseData>({
  url,
  method = 'GET',
  requireAuth = true,
  requestData,
  requestDataFormat = 'JSON',
  clientComponent = false,
  cacheTags,
  limit,
  offset,
  searchQuery,
  filters,
  sortByDesc = true,
}: {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  requireAuth?: boolean;
  requestData?: TRequestData;
  requestDataFormat?: 'JSON' | 'form';
  clientComponent?: boolean;
  cacheTags?: string[];
  limit?: number;
  offset?: number;
  searchQuery?: string;
  filters?: { name: string; value: string }[] | null;
  sortByDesc?: boolean;
}): Promise<BackendAPIResult<TResponseData>> {
  // url
  //const fetchUrl = !clientComponent ? serverComponentAPIUrl + url : clientComponentAPIUrl + url;

  const baseUrl = !clientComponent ? serverComponentAPIUrl : clientComponentAPIUrl;

  // const requestUrl = new URL(baseUrl + url);
  //console.log(requestUrl);

  const fetchParams = new URLSearchParams();

  // if (limit || offset || searchQuery) {
  if (limit) fetchParams.append('limit', limit.toString());

  if (offset) fetchParams.append('offset', offset.toString());

  if (searchQuery) fetchParams.append('query', searchQuery);

  if (filters) {
    filters.forEach((filter) => fetchParams.append(filter.name.replace('filter_', ''), filter.value));
  }

  if (sortByDesc === false) fetchParams.append('sort_by_desc', false as unknown as string);

  //console.log(fetchParams);

  const fetchUrl = fetchParams.size ? new URL(`${baseUrl}${url}?${fetchParams}`) : new URL(`${baseUrl}${url}`);
  console.log(fetchUrl);

  // method
  const fetchMethod = method;

  // headers
  const fetchHeaders = new Headers();

  if (requireAuth) {
    const token = await getAuthAccessToken();

    fetchHeaders.append('Authorization', `Bearer ${token}`);
  }

  if (requestData && requestDataFormat === 'JSON') fetchHeaders.append('Content-Type', 'application/json');

  // body
  let fetchBody: string | FormData | null = null;

  if (requestData) {
    if (requestDataFormat === 'JSON') fetchBody = JSON.stringify(requestData);

    if (requestDataFormat === 'form') {
      const fetchFormData = new FormData();

      Object.entries(requestData).forEach(([key, value]) => {
        fetchFormData.append(key, value as string | Blob);
      });

      if (fetchFormData) fetchBody = fetchFormData;
    }
  }

  try {
    const response = await fetch(fetchUrl, {
      method: fetchMethod,
      headers: fetchHeaders,
      body: fetchBody,
      next: {
        tags: cacheTags,
      },
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);

      return {
        data: null,
        error: {
          message: typeof result?.detail === 'string' ? result.detail : `Request failed with status ${response.status}`,
          detail: result?.detail ?? null,
        },
        status: response.status,
      };
    }

    if (response.status === 204) {
      return {
        data: null,
        error: null,
        status: response.status,
      };
    }

    const result = await response.json();

    return {
      data: result.data,
      error: null,
      status: response.status,
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      status: null,
    };
  }
}

export { backendAPIFetch };
