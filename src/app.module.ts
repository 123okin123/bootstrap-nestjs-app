import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<PostgresConnectionOptions> => {
        return ({
        type: 'postgres',
        host: configService.get<string>('TYPEORM_HOST'),
        port: configService.get<number>('TYPEORM_PORT'),
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        database: configService.get<string>('TYPEORM_DATABASE'),
        entities: [
          `${__dirname  }/**/*.entity{.ts,.js}`,
        ],
        migrations: [ `${__dirname  }/migrations/**/*.{.ts,.js}`],
        cli: {
          migrationsDir: 'src/migrations',
          entitiesDir:  'src/models',
        },
        synchronize: true,
        logging: true,
        migrationsRun: false,

      })},
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [
    AppController
  ],
  providers: [AppService]
})
export class AppModule {}
