const databaseUser: string = process.env.DATABASE_USER as string;
const databaseName: string = process.env.DATABASE_NAME as string;
const databasePassword: string = process.env.DATABASE_PASSWORD as string;
const databaseHost: string = process.env.DATABASE_HOST as string;
const databasePort: string = process.env.DATABASE_PORT as string;
const databaseConnectionOpts: string = process.env.DATABASE_CONNECTION_OPTIONS as string;

export const remoteUrl: string = 'mongodb+srv://juicer:Sytw09@cluster0.y0awkyy.mongodb.net/juicer?retryWrites=true&w=majority';
export const remoteUrl2: string = `mongodb://${databaseUser}:${databasePassword}@${databaseHost}${databasePort}/${databaseName}?${databaseConnectionOpts}`;
