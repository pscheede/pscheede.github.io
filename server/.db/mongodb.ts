import { MongoMemoryServer } from 'mongodb-memory-server';
import { createInterface } from 'readline';

const delay = (ms: number) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});

let running = true;
let server: MongoMemoryServer;

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    console.log('Starting MongoDB...');

    server = await MongoMemoryServer.create({
        instance: {
            port: 42000,
            dbPath: './.db/mongo_dev',
            dbName: 'mongo_dev',
            storageEngine: 'wiredTiger',
        },
    });

    console.log('Running at:', server.getUri('website-backend'));

    rl.question('Please press Enter to properly exit this script. Don\'t use Ctrl+C...', () => {
        rl.close();
        running = false;
    });

    while (running) {
        // eslint-disable-next-line no-await-in-loop
        await delay(100);
    }

    await server.stop();
    console.log('Stopped Server.');
}

main().then();