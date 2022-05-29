import {buildConfig} from 'payload/config';
import path from 'path';
// import Examples from './collections/Examples';
import Users from './collections/Users';
import Images from "./collections/Images";

export default buildConfig({
    serverURL: 'http://localhost:3042',
    admin: {
        user: Users.slug,
    },
    collections: [
        Users,
        // Add Collections here
        // Examples,
        Images,
    ],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts')
    },
    cors: "*"
});
