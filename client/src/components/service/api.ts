export interface HomepageData {
    landscapePhotoUrl: string;
    portraitPhotoUrl: string;
    softwarePhotoUrl: string;
}

const API_URL: string = import.meta.env.VITE_STRAPI_URL;
const API_TOKEN: string = import.meta.env.VITE_STRAPI_KEY;

export async function getHomepageData(): Promise<HomepageData> {
    const resp = await fetch(`${API_URL}/api/homepage?populate=portrait_card,landscape_card,software_card`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        },
    });
    if (!resp.ok) {
        throw new Error('Failed to fetch homepage data');
    }
    const json = await resp.json();

    return {
        landscapePhotoUrl: API_URL + json.data.attributes.landscape_card.data.attributes.formats.medium.url,
        portraitPhotoUrl: API_URL + json.data.attributes.portrait_card.data.attributes.formats.medium.url,
        softwarePhotoUrl: API_URL + json.data.attributes.software_card.data.attributes.formats.medium.url,
    };
}

export interface AlbumInfos {
    titleTextKey: string;
    slug: string;
    coverImageUrl: string;
}

export async function getAlbums(): Promise<AlbumInfos[]> {
    const resp = await fetch(`${API_URL}/api/albums?populate=titleTextKey,slug,coverImage`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        }
    });

    if (!resp.ok) {
        throw new Error('Failed to fetch albums');
    }
    const json = await resp.json();

    const result: AlbumInfos[] = [];

    for (const album of json.data) {
        result.push({
            titleTextKey: album.attributes.titleTextKey,
            slug: album.attributes.slug,
            coverImageUrl: API_URL + album.attributes.coverImage.data.attributes.formats.medium.url,
        });
    }

    return result;
}

export interface AlbumImage {
    /**
     * The URL of the image in the original size.
     */
    url: string;

    /**
     * The filename of the image.
     */
    filename: string;

    thumbnailUrl: string;

    /**
     * All available sizes of the image.
     */
    sizes: { [width: number]: string };
}

export async function getImagesForAlbum(albumSlug: string): Promise<AlbumImage[]> {
    const resp = await fetch(`${API_URL}/api/albums?filters[slug][$eq]=${albumSlug}&populate=images`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        }
    });

    if (!resp.ok) {
        throw new Error('Failed to fetch album images');
    }
    const json: { data: ApiAlbum[] } = await resp.json();

    if (json.data.length < 1) {
        throw new Error('Album not found');
    }

    const album: ApiAlbum = json.data[0];

    const result: AlbumImage[] = [];

    for (const image of album.attributes.images.data) {
        const sizes: { [width: number]: string } = {};

        for (const format of Object.values(image.attributes.formats)) {
            sizes[format.width] = API_URL + format.url;
        }

        result.push({
            url: API_URL + image.attributes.url,
            filename: image.attributes.name,
            thumbnailUrl: API_URL + image.attributes.formats.small.url,
            sizes,
        });
    }

    return result;
}

interface ApiAlbum {
    id: number;
    attributes: {
        images: { data: ApiImage[] },
    };
}

interface ApiImage {
    id: number;
    attributes: {
        formats: { [formatName: string]: SizeInfo };
    } & SizeInfo;
}

interface SizeInfo {
    name: string;
    width: number;
    height: number;
    url: string;
}

export async function getAlbumTranslations(): Promise<Record<'de' | 'en', unknown>> {
    const resp = await fetch(`${API_URL}/api/translation`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        }
    });

    if (!resp.ok) {
        throw new Error('Failed to fetch album translations');
    }
    const json: { data: { attributes: { translations: Record<'de' | 'en', unknown> } } } = await resp.json();

    return {
        de: json.data.attributes.translations.de,
        en: json.data.attributes.translations.en,
    };
}

export async function getCategories(): Promise<string[]> {
    const resp = await fetch(`${API_URL}/api/categories`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        }
    });

    if (!resp.ok) {
        throw new Error('Failed to fetch categories');
    }
    const json = await resp.json();

    return json.data.map((category: { attributes: { name_text_key: string } }) => category.attributes.name_text_key);
}

interface CategoryContent {
    albums: AlbumInfos[];
    highlightAlbum?: AlbumInfos;
}

export async function getCategoryContent(category: string): Promise<CategoryContent> {
    const resp = await fetch(`${API_URL}/api/categories?filters[name_text_key][$eq]=${category}&populate[0]=albums,highlight_album&populate[1]=albums.coverImage,highlight_album.coverImage`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        }
    });

    if (!resp.ok) {
        throw new Error('Failed to fetch category content');
    }
    const json = await resp.json();

    if (json.data.length < 1) {
        throw new Error('Category not found');
    }

    const categoryData = json.data[0];

    const albums: AlbumInfos[] = [];
    for (const album of categoryData.attributes.albums.data) {
        albums.push({
            titleTextKey: album.attributes.titleTextKey,
            slug: album.attributes.slug,
            coverImageUrl: API_URL + album.attributes.coverImage.data.attributes.formats.medium.url,
        });
    }

    let highlightAlbum: AlbumInfos | undefined = undefined;
    if (categoryData.attributes.highlight_album.data) {
        highlightAlbum = {
            titleTextKey: categoryData.attributes.highlight_album.data.attributes.titleTextKey,
            slug: categoryData.attributes.highlight_album.data.attributes.slug,
            coverImageUrl: API_URL + categoryData.attributes.highlight_album.data.attributes.coverImage.data.attributes.formats.medium.url,
        };
    }

    return {
        albums,
        highlightAlbum,
    };
}
