const fs = require('fs');
const file = 'app/products/[main]/[sub]/[slug]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const importTarget = "import ProductPurchaseCTA from '../../../../../components/ProductPurchaseCTA';";
const importReplacement = "import ProductPricingWidget from '../../../../../components/ProductPricingWidget';";
content = content.replace(importTarget, importReplacement);

const widgetTarget = `<div className="space-y-8">
                                <div>
                                    <span className="text-[11px] font-black text-text-muted uppercase tracking-widest block mb-2">
                                        {locale === 'en' ? 'Investment' : 'Investasi'}
                                    </span>
                                    <div className="text-4xl font-black text-brand-blue tracking-tight">
                                        {formatPrice(Number(product.price), product.billing_period)}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-glass-border">
                                    <div className="flex items-start space-x-3 text-sm text-text-gray font-medium">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                            <Shield className="w-3.5 h-3.5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-text-main block">{locale === 'en' ? 'Warranty Support' : 'Dukungan Garansi'}</span>
                                            <span className="text-xs">{locale === 'en' ? 'Technical support & bug fixes included.' : 'Dukungan teknis & garansi perbaikan bug.'}</span>
                                        </div>
                                    </div>

                                    {product.license_info && (
                                        <div className="flex items-start space-x-3 text-sm text-text-gray font-medium">
                                            <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                                                <Info className="w-3.5 h-3.5 text-brand-blue" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-text-main block">{locale === 'en' ? 'Product License' : 'Lisensi Produk'}</span>
                                                <span className="text-xs">{product.license_info}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-glass-border">
                                    <ProductPurchaseCTA
                                        productId={product.id}
                                        productSlug={product.slug}
                                        price={Number(product.price)}
                                        name={product.name}
                                        billingPeriod={product.billing_period}
                                        filePath={product.file_path || null}
                                    />
                                </div>
                            </div>`;

const widgetReplacement = `<ProductPricingWidget product={product} locale={locale} />`;

if (content.includes(widgetTarget)) {
    content = content.replace(widgetTarget, widgetReplacement);
} else {
    // try to replace by regex if exact match fails due to line endings
    const widgetTargetCRLF = widgetTarget.replace(/\n/g, '\r\n');
    if (content.includes(widgetTargetCRLF)) {
        content = content.replace(widgetTargetCRLF, widgetReplacement);
    } else {
        console.log("Could not find the target string!");
    }
}

fs.writeFileSync(file, content);
console.log("Updated page.tsx with ProductPricingWidget");
