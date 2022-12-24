import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoModule } from "./todo/todo.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: "mysql",
          host: configService.get<string>("DB_HOST"),
          port: configService.get<number>("DB_PORT"),
          username: configService.get<string>("DB_USER"),
          password: configService.get<string>("DB_PASSWORD"),
          database: configService.get<string>("DB_DATABASE"),
          synchronize: true,
          logging: true,
          entities: [__dirname + "/**/*.entity.{js,ts}"],
        };
      },
    }),
    TodoModule,
    AuthModule,
  ],
})
export class AppModule {}
