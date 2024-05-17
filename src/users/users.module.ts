import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolver';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSettingService } from './user-setting.service';
import { UserSetting } from 'src/graphql/models/UserSetting';
import { UserSettingResolver } from 'src/graphql/resolvers/UserSettingResolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  controllers: [],
  providers: [
    UserResolver,
    UserService,
    UserSettingService,
    UserSettingResolver,
  ],
})
export class UsersModule {}
