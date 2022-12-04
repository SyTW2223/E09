const databaseUser: string = "juicer";//process.env.DATABASE_USER as string;
const databaseName: string = "juicer";//= process.env.DATABASE_NAME as string;
const databasePassword: string = "Sytw09";// = process.env.DATABASE_PASSWORD as string;
const databaseHost: string = "172.16.119.20";//process.env.DATABASE_HOST as string;
const databasePort: string = "27017";// = process.env.DATABASE_PORT as string;
const databaseConnectionOpts: string = "directConnection=true&authSource=admin";// = process.env.DATABASE_CONNECTION_OPTIONS as string;

export const remoteUrl: string = `mongodb://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}?${databaseConnectionOpts}`;
