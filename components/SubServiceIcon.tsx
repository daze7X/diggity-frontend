import React from 'react';
import { 
    Globe, Smartphone, Monitor, Code2, Building, GitBranch, PenTool, Wrench,
    Brain, Bot, MessageSquare, LineChart, Database, BarChart, Wifi, Glasses, MonitorPlay, Gamepad2, Settings,
    Palette, Camera, Video, Film, Box, Edit3, Megaphone,
    Search, MousePointerClick, Share2, Music, Store, ShoppingBag, FileText, Star, Mail, TrendingUp,
    Cloud, CloudLightning, Activity, Server, Shield, ShieldAlert, CheckCircle, Headphones,
    Lightbulb, Briefcase, Zap, Compass, UserPlus, Users, Code, Cpu, Layers, HelpCircle,
    Wallet, Package, CheckSquare, Layout, FolderOpen, Coins, BookOpen, Fingerprint, Anchor,
    Aperture, Command, Component, Cpu as CpuIcon, Hexagon, LifeBuoy, Rocket, Target, Send
} from 'lucide-react';

const exactSlugIconMap: Record<string, any> = {
    // Technology
    'website-development': Globe,
    'mobile-app-development': Smartphone,
    'web-application-development': Monitor,
    'custom-software-development': Code2,
    'government-digital-solutions': Building,
    'system-integration': GitBranch,
    'ui-ux-design': PenTool,
    'maintenance-support': Wrench,
    
    // AI
    'artificial-intelligence': Brain,
    'ai-agent-development': Bot,
    'ai-chatbot': MessageSquare,
    'machine-learning': LineChart,
    'business-intelligence': BarChart,
    'data-analytics': LineChart,
    'data-engineering': Database,
    'iot-development': Wifi,
    'ar-vr': Glasses,
    'interactive-technology': MonitorPlay,
    'game-development': Gamepad2,
    'automation': Settings,

    // Creative
    'brand-strategy': Compass,
    'brand-identity': Palette,
    'graphic-design': PenTool,
    'photography': Camera,
    'videography': Video,
    'motion-graphics': Film,
    '2d-3d-animation': Box,
    'content-creation': Edit3,
    'creative-campaign': Megaphone,

    // Growth
    'seo': Search,
    'google-ads': MousePointerClick,
    'meta-ads': Share2,
    'tiktok-ads': Music,
    'linkedin-ads': Users,
    'marketplace-management': Store,
    'marketplace-ads': ShoppingBag,
    'social-media-management': Smartphone,
    'content-marketing': FileText,
    'influencer-marketing': Star,
    'email-marketing': Mail,
    'live-commerce': Video,
    'conversion-optimization': TrendingUp,

    // Cloud & Cyber Security
    'cloud-services': Cloud,
    'cloud-migration': CloudLightning,
    'devops': Activity,
    'infrastructure': Server,
    'cyber-security': Shield,
    'security-assessment': ShieldAlert,
    'quality-assurance': CheckCircle,
    'managed-services': Headphones,

    // Consulting
    'it-consulting': Code,
    'business-consulting': Briefcase,
    'digital-transformation': Zap,
    'technology-advisory': Lightbulb,

    // Talent
    'it-headhunting': UserPlus,
    'it-outsourcing': Users,

    // Core Categories
    'website-commerce': Store,
    'sales': TrendingUp,
    'finance': Wallet,
    'inventory-manufacturing': Package,
    'human-resources': Users,
    'marketing': Megaphone,
    'services': Briefcase,
    'productivity': CheckSquare,
    'graphics': Palette,
    'design-templates': Layout,
    '3d': Box,
    'web': Code2,
    'resources': FolderOpen,
};

// Keyword mapping for dynamic products (e.g. diggity-ecommerce, diggity-forum)
const keywordIconMap: Array<{keywords: string[], icon: any}> = [
    { keywords: ['ecommerce', 'shop', 'cart', 'store'], icon: ShoppingBag },
    { keywords: ['forum', 'chat', 'message', 'communicate', 'live'], icon: MessageSquare },
    { keywords: ['website', 'web', 'site', 'landing'], icon: Globe },
    { keywords: ['blog', 'article', 'news', 'press'], icon: FileText },
    { keywords: ['learn', 'edu', 'academy', 'course', 'school'], icon: BookOpen },
    { keywords: ['pay', 'finance', 'wallet', 'invoice', 'billing'], icon: Wallet },
    { keywords: ['data', 'analytics', 'stat', 'report', 'metric'], icon: BarChart },
    { keywords: ['user', 'hr', 'employee', 'staff', 'talent'], icon: Users },
    { keywords: ['sec', 'auth', 'protect', 'guard', 'cyber'], icon: Shield },
    { keywords: ['manage', 'admin', 'erp', 'crm', 'system'], icon: Layout },
    { keywords: ['api', 'code', 'dev', 'script', 'engine'], icon: Code2 },
    { keywords: ['cloud', 'server', 'host', 'deploy'], icon: Cloud },
    { keywords: ['video', 'stream', 'meet', 'cam'], icon: Video },
    { keywords: ['mail', 'email', 'newsletter', 'campaign'], icon: Send },
    { keywords: ['design', 'graphic', 'art', 'draw'], icon: Palette },
    { keywords: ['game', 'play'], icon: Gamepad2 },
];

// Generic cool SaaS icons for fallback based on string hash
const genericSaaSIcons = [
    Component, Hexagon, Command, Aperture, Layers, Target, Rocket, CpuIcon, LifeBuoy, Fingerprint, Anchor
];

function getHashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

export default function SubServiceIcon({ slug, fallbackCategoryIcon, className = "w-4 h-4" }: { slug: string, fallbackCategoryIcon?: string, className?: string }) {
    const safeSlug = (slug || '').toLowerCase();
    
    // 1. Try Exact Match
    if (exactSlugIconMap[safeSlug]) {
        const Icon = exactSlugIconMap[safeSlug];
        return <Icon className={className} />;
    }
    
    // 2. Try Keyword Match
    for (const mapping of keywordIconMap) {
        if (mapping.keywords.some(keyword => safeSlug.includes(keyword))) {
            const Icon = mapping.icon;
            return <Icon className={className} />;
        }
    }
    
    // 3. Deterministic Pseudo-random Fallback based on slug
    if (safeSlug) {
        const hash = getHashString(safeSlug);
        const Icon = genericSaaSIcons[hash % genericSaaSIcons.length];
        return <Icon className={className} />;
    }

    // 4. Ultimate Fallback to passed category icon
    const catMap: Record<string, any> = {
        'code': Code,
        'cpu': Cpu,
        'shield-check': Shield,
        'layers': Layers,
        'trending-up': TrendingUp,
        'help-circle': HelpCircle,
        'users': Users
    };
    
    const FallbackIcon = catMap[fallbackCategoryIcon || ''] || Component;
    return <FallbackIcon className={className} />;
}
