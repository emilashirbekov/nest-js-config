import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { DatabaseModule } from "./database/database.module";
import { EmployeesModule } from "./employees/employees.module";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([
      {
        name: "short",
        ttl: 1000,
        limit: 3,
      },
      {
        name: "short",
        ttl: 60000,
        limit: 10,
      },
    ]),
    MyLoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
