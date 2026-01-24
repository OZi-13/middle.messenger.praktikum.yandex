import UserApi from '../api/userApi';
import * as ApiType from '../types/apiType';
import * as UserType from '../types/userType';
import { ROUTER } from '../utils/links';
import Router from '../framework/Router';
import modal from '../utils/Modal';
import { StoreInterface } from '../types/appType';

export default class UserService {
  private readonly api: UserApi;

  private readonly store: StoreInterface;

  private readonly router: Router;

  constructor({ store, router }: { store: StoreInterface, router: Router }) {
    this.api = new UserApi();
    this.store = store;
    this.router = router;
  }

  public async userEdit(data: UserType.UserEditType): Promise<void> {
    this.store.set({
      responseError: null,
    });

    try {
      const updatedUser: ApiType.UserDTO = await this.api.edit(data);
      console.log('Обновили юзера ', updatedUser);
      this.store.set({ user: updatedUser });
      this.router.go(ROUTER.profile);

    } catch (error) {
      const reason = (error as ApiType.ResponseError).reason || 'Неизвестная ошибка';
      this.store.set({ responseError: reason });
    }
  }

  public async userEditPassword(data: UserType.UserEditPassType): Promise<void> {
    this.store.set({
      responseError: null,
    });
    try {
      await this.api.editPassword(data);
      console.log('Обновили пароль');
      this.router.go(ROUTER.profile);

    } catch (error) {
      const reason = (error as ApiType.ResponseError).reason || 'Неизвестная ошибка';
      this.store.set({ responseError: reason });
    }
  }

  public async userEditAvatar(data: UserType.UserEditAvatarType): Promise<void> {

    this.store.set({
      responseError: null,
    });

    const formData = new FormData();
    const fileList = data.avatar;

    if (fileList && fileList.length > 0) {
      formData.append('avatar', fileList[0], fileList[0].name);
    } else {
      this.store.set({
        responseError: 'Файл аватара отсутствует.',
      });
      return;
    }

    try {
      const updatedUser: ApiType.UserDTO = await this.api.editAvatar(formData);

      console.log('Обновили аватар', updatedUser);
      this.store.set({ user: updatedUser });
      modal.close();

    } catch (error) {
      const reason = (error as ApiType.ResponseError)?.reason || 'Неизвестная ошибка обновления аватара';
      this.store.set({
        responseError: reason,
      });
    }
  }

  public async searchUsers(login: string): Promise<ApiType.UserDTO[]> {
    try {
      return await this.api.search({ login });
    } catch (error) {
      console.error('Ошибка поиска пользователей:', error);
      return [];
    }
  }
}
