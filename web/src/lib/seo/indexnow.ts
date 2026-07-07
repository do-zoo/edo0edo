const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const SITE_HOST = 'https://edo0edo.me';
const INDEXNOW_KEY = '5701ca226c014d21bf2170bc6c26d310';
const INDEXNOW_KEY_LOCATION = `${SITE_HOST}/${INDEXNOW_KEY}.txt`;

export async function submitIndexNowUrls(paths: string[]) {
  if (paths.length === 0) return;

  const uniqueUrls = Array.from(
    new Set(
      paths.map((path) => {
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        return `${SITE_HOST}${normalizedPath}`;
      }),
    ),
  );

  const payload = {
    host: 'edo0edo.me',
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: uniqueUrls,
  };

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`IndexNow submit failed with status ${response.status}`);
  }
}
