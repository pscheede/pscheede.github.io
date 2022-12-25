import {useI18n} from "vue-i18n";
import {onMounted} from "vue";
import {getAlbumTranslations} from "@/components/service/api";

let registeredTranslations = false;

export function useAlbumTranslations() {
    const { mergeLocaleMessage} = useI18n();

    onMounted(async () => {
        const translations = await getAlbumTranslations();

        mergeLocaleMessage('de', translations.de);
        mergeLocaleMessage('en', translations.en);

        registeredTranslations = true;
    });
}