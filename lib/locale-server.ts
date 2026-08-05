import { cookies } from 'next/headers';

export async function getLocaleServer(): Promise<'id' | 'en'> {
    try {
        const cookieStore = await cookies();
        const locale = cookieStore.get('NEXT_LOCALE')?.value;
        return locale === 'en' ? 'en' : 'id';
    } catch {
        return 'id';
    }
}
