export interface HomepageData {
    landscapePhotoUrl: string;
    portraitPhotoUrl: string;
    softwarePhotoUrl: string;
}

const API_URL = import.meta.env.VITE_STRAPI_URL;
const API_TOKEN = import.meta.env.VITE_STRAPI_KEY;

export async function getHomepageData(): Promise<HomepageData> {
    const resp = await fetch(`${API_URL}/api/homepage?populate=portrait_card,landscape_card,software_card`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        },
    });
    console.log(resp)
    if (!resp.ok) {
        throw new Error('Failed to fetch homepage data');
    }
    const json = await resp.json();

    console.log(json);

    const result = {
        landscapePhotoUrl: API_URL + json.data.attributes.landscape_card.data.attributes.formats.medium.url,
        portraitPhotoUrl: API_URL + json.data.attributes.portrait_card.data.attributes.formats.medium.url,
        softwarePhotoUrl: API_URL + json.data.attributes.software_card.data.attributes.formats.medium.url,
    };
    console.log('result', result);
    return result
}