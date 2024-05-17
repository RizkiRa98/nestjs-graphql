import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from 'src/graphql/models/User';
import { mockUsers } from 'src/__mocks__/MockUser';
import { Inject, NotFoundException } from '@nestjs/common';
import { UserSetting } from 'src/graphql/models/UserSetting';
import { MockUserSettings } from 'src/__mocks__/MockUserSetting';
import { CreateUserInput } from 'src/graphql/utils/CreateUserInput';
import { UserService } from './users.service';
import { UserSettingService } from './user-setting.service';

export let incrementalId = 3;

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private userSettingService: UserSettingService,
  ) {}
  // Create query getUser to return User models
  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }

  // Create query for get user by id
  @Query(() => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    try {
      const User = this.userService.getUsersById(id);

      if (!User) {
        throw new NotFoundException(`User ${id} not found`);
      }

      return User;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  // Show relation table
  // which is UserSetting table base on user id
  // @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true })
  // getUserSettings(@Parent() user: User) {
  //   return this.userSettingService.getUserSettingById(user.id);
  // }

  // Create user
  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }
}
