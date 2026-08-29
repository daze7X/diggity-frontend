import React from 'react';
import { 
    Globe, Smartphone, Monitor, Code2, Building, GitBranch, PenTool, Wrench,
    Brain, Bot, MessageSquare, LineChart, Database, BarChart, Wifi, Glasses, MonitorPlay, Gamepad2, Settings,
    Palette, Camera, Video, Film, Box, Edit3, Megaphone,
    Search, MousePointerClick, Share2, Music, Store, ShoppingBag, FileText, Star, Mail, TrendingUp,
    Cloud, CloudLightning, Activity, Server, Shield, ShieldAlert, CheckCircle, Headphones,
    Lightbulb, Briefcase, Zap, Compass, UserPlus, Users, Code, Cpu, Layers, HelpCircle,
    Wallet, Package, CheckSquare, Layout, FolderOpen, Coins
} from 'lucide-react';

const slugIconMap: Record<string, any> = {
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

    // Products
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


export default function SubServiceIcon({ slug, fallbackCategoryIcon, className = "w-4 h-4" }: { slug: string, fallbackCategoryIcon?: string, className?: string }) {
    const Icon = slugIconMap[slug];
    if (Icon) return <Icon className={className} />;
    
    // Fallback to category icon
    const catMap: Record<string, any> = {
        'code': Code,
        'cpu': Cpu,
        'shield-check': Shield,
        'layers': Layers,
        'trending-up': TrendingUp,
        'help-circle': HelpCircle,
        'users': Users
    };
    
    const FallbackIcon = catMap[fallbackCategoryIcon || ''] || Code;
    return <FallbackIcon className={className} />;
}
