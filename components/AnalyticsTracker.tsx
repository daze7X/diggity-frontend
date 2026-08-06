'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function AnalyticsTracker() {
    const pathname = usePathname();

    const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
    const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

    useEffect(() => {
        // Track page view in GA4 on route change
        if (GA_ID && (window as any).gtag) {
            (window as any).gtag('config', GA_ID, {
                page_path: pathname,
            });
        }

        // Track page view in Meta Pixel on route change
        if (PIXEL_ID && (window as any).fbq) {
            (window as any).fbq('track', 'PageView');
        }
    }, [pathname, GA_ID, PIXEL_ID]);

    useEffect(() => {
        // Expose global helper function for Ads and Pixel conversion reporting
        (window as any).reportAdsConversion = (value: number, currency: string = 'IDR') => {
            const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
            const adsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

            // Google Ads Conversion Event
            if ((window as any).gtag && adsId && adsLabel) {
                (window as any).gtag('event', 'conversion', {
                    send_to: `${adsId}/${adsLabel}`,
                    value: value,
                    currency: currency,
                });
            }

            // Purchase tracking for GA4
            if ((window as any).gtag) {
                (window as any).gtag('event', 'purchase', {
                    value: value,
                    currency: currency,
                });
            }

            // Meta Pixel purchase tracking
            if ((window as any).fbq) {
                (window as any).fbq('track', 'Purchase', {
                    value: value,
                    currency: currency,
                });
            }
        };
    }, []);

    return (
        <>
            {/* Google Search Console verification meta tag */}
            {GSC_VERIFICATION && (
                <meta name="google-site-verification" content={GSC_VERIFICATION} />
            )}

            {/* Google Tag Manager - Script in Head */}
            {GTM_ID && (
                <Script
                    id="gtm-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','${GTM_ID}');
                        `,
                    }}
                />
            )}

            {/* Google Analytics 4 - gtag.js */}
            {GA_ID && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                        strategy="afterInteractive"
                    />
                    <Script
                        id="ga4-script"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${GA_ID}');
                            `,
                        }}
                    />
                </>
            )}

            {/* Meta Pixel - fbq.js */}
            {PIXEL_ID && (
                <Script
                    id="meta-pixel"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            !function(f,b,e,v,n,t,s)
                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)}(window, document,'script',
                            'https://connect.facebook.net/en_US/fbevents.js');
                            fbq('init', '${PIXEL_ID}');
                            fbq('track', 'PageView');
                        `,
                    }}
                />
            )}
        </>
    );
}
