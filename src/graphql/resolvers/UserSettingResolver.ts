import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSetting } from '../models/UserSetting';
import { CreateUserSettingsInput } from '../utils/CreateUserSettingInput';
import { MockUserSettings } from 'src/__mocks__/MockUserSetting';
import { UserSettingService } from 'src/users/user-setting.service';

@Resolver()
export class UserSettingResolver {
  constructor(private userSettingService: UserSettingService) {}

  @Mutation((returns) => UserSetting)
  async createUserSetting(
    @Args('createUserSettingData')
    createUserSettingData: CreateUserSettingsInput,
  ) {
    const userSettings = await this.userSettingService.creataUserSettings(
      createUserSettingData,
    );

    return userSettings;
  }
}
