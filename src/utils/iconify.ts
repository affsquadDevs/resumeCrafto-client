const SAFE_PREFIXES = 'mdi,lucide,ph,bi,ri,tabler,feather,heroicons,material-symbols,jam';

export interface IconifySearchResponse {
    icons: string[];
    total: number;
    limit: number;
    start: number;
}

export interface IconifyIconData {
    body: string;
    width?: number;
    height?: number;
    left?: number;
    top?: number;
}

export interface IconifyDetailsResponse {
    icons: {
        [key: string]: IconifyIconData;
    };
    width?: number;
    height?: number;
    info?: any;
}

export const searchIcons = async (query: string): Promise<string[]> => {
    if (!query.trim()) return [];

    try {
        const prefixParam = `&prefixes=${SAFE_PREFIXES}`;
        const response = await fetch(`https://api.iconify.design/search?query=${encodeURIComponent(query)}${prefixParam}&limit=30`);
        const data: IconifySearchResponse = await response.json();
        return data.icons || [];
    } catch (error) {
        console.error('Failed to search icons:', error);
        return [];
    }
};

export const getIconDetails = async (iconName: string): Promise<{ body: string; width: number; height: number } | null> => {
    try {
        const [prefix, name] = iconName.split(':');
        const response = await fetch(`https://api.iconify.design/${prefix}.json?icons=${name}`);
        const data: IconifyDetailsResponse = await response.json();

        if (data.icons && data.icons[name]) {
            const iconData = data.icons[name];
            const width = iconData.width || data.width || 24;
            const height = iconData.height || data.height || 24;

            return {
                body: iconData.body,
                width,
                height
            };
        }
        return null;
    } catch (error) {
        console.error('Failed to load icon details:', error);
        return null;
    }
};
