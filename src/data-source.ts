import 'reflect-metadata';
import 'dotenv/config';
import path from "path";
import { DataSourceOptions, DataSource } from "typeorm";

export const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, './entities/**.{js,ts}');
    const migrationsPath: string = path.join(__dirname, './migrations/**.{js,ts}')

    const nodeEnv: string | undefined = process.env.NODE_ENV;

    if(nodeEnv === 'test'){
        return{
            type:'sqlite',
            database:':memory:',
            synchronize:true,
            entities:[entitiesPath]
        }
    }

    const urlDB: string | undefined = process.env.DATABASE_URL;

    if(!urlDB){
        throw new Error("Database doesn't found.")
    }

    return{
        type:'postgres',
        url:urlDB,
        synchronize:false,
        logging: true,
        entities:[entitiesPath],
        migrations:[migrationsPath]
    }
}

const AppDataSource = new DataSource(dataSourceConfig())

export default AppDataSource