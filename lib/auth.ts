export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at?: string | null;
    created_at?: string;
    updated_at?: string;
}

export function setCookie(name: string, value: string, days = 7) {
    if (typeof window === 'undefined') return;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
    if (typeof window === 'undefined') return null;
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, null as string | null);
}

export function eraseCookie(name: string) {
    if (typeof window === 'undefined') return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
}
