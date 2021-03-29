import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';


import { JwtMiddleware } from './middlewares/jwt.middlewere';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './gaurds/auth.guard';



@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/nest')
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('*')
  }
}
