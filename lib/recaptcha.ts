/**
 * Execute Google reCAPTCHA v3 on the client side.
 * Returns the token string or null if not configured or execution fails.
 */
export const executeRecaptcha = async (action: string): Promise<string | null> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    
    // Fallback if reCAPTCHA is not configured or not running in a browser context
    if (!siteKey || typeof window === 'undefined' || !(window as any).grecaptcha) {
        return null;
    }

    return new Promise((resolve) => {
        (window as any).grecaptcha.ready(async () => {
            try {
                const token = await (window as any).grecaptcha.execute(siteKey, { action });
                resolve(token);
            } catch (err) {
                console.error('reCAPTCHA execution error:', err);
                resolve(null);
            }
        });
    });
};
