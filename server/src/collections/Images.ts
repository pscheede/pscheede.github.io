import {CollectionConfig} from "payload/types";

const Images: CollectionConfig = {
    slug: 'images',
    admin: {
        useAsTitle: 'filename',
        disableDuplicate: true,
    },
    fields: [
        {
            'name': 'description',
            'type': 'text',
        },
    ],
    access: {
        read: () => true,
    },
    upload: {
        staticURL: '/media',
        staticDir: 'media',
        mimeTypes: ['image/*'],
        adminThumbnail: 'thumbnail',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: null,
                crop: 'centre',
            },
            {
                name: '1000',
                width: 1000,
                height: null,
                crop: 'centre',
            },
            {
                name: '2000',
                width: 2000,
                height: null,
                crop: 'centre',
            },
        ],

    }
};

export default Images;