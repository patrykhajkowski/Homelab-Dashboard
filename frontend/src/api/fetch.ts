const SESSION_EXPIRED_KEY = "auth-session-expired";

type UnauthorizedHandler = (reason: "expired" | "unauthorized") => void;

let unauthorizedHandler: UnauthorizedHandler | null = null;

function isLoginRequest(input: RequestInfo | URL): boolean {
  const url = typeof input === "string" ? input : input.toString();
  return url.includes("/api/auth/login");
}

async function readUnauthorizedReason(
  response: Response,
): Promise<"expired" | "unauthorized"> {
  try {
    const data = (await response.clone().json()) as { detail?: string };
    if (data.detail === "Session expired") {
      return "expired";
    }
  } catch {
    // Ignore JSON parse errors for unauthorized responses.
  }
  return "unauthorized";
}

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  unauthorizedHandler = handler;
}

export function markSessionExpired() {
  sessionStorage.setItem(SESSION_EXPIRED_KEY, "1");
}

export function consumeSessionExpiredFlag(): boolean {
  const expired = sessionStorage.getItem(SESSION_EXPIRED_KEY) === "1";
  if (expired) {
    sessionStorage.removeItem(SESSION_EXPIRED_KEY);
  }
  return expired;
}

export async function apiFetch(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, {
    ...init,
    credentials: "include",
  });

  if (response.status === 401 && !isLoginRequest(input)) {
    const reason = await readUnauthorizedReason(response);
    if (reason === "expired") {
      markSessionExpired();
    }
    unauthorizedHandler?.(reason);
  }

  return response;
}
