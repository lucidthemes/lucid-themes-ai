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
}: {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  requireAuth?: boolean;
  requestData?: TRequestData;
  requestDataFormat?: 'JSON' | 'form';
  clientComponent?: boolean;
}): Promise<BackendAPIResult<TResponseData>> {
  // url
  const fetchUrl = !clientComponent ? serverComponentAPIUrl + url : clientComponentAPIUrl + url;

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
