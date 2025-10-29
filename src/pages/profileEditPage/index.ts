import Block, { BlockProps } from '../../framework/Block';
import { PageName } from '../../App';
import template from './profileEditPage.hbs';
import { profileInfo, ProfileInfoType } from '../../helpers/mockDataProfile';

import { Header } from '../../components/header';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { BoxHeader } from '../../components/boxHeader';
import { Form } from '../../components/form';
import { NavLineLeft } from '../../components/navLineLeft';
import { NavLineRight } from '../../components/navLineRight';

interface ProfileEditPageProps extends BlockProps {
  changePage: (page: PageName) => void;
}

export class ProfileEditPage extends Block {
  constructor(props: ProfileEditPageProps) {

    const ProfileList = profileInfo.map(
      ({ header, name, value }: ProfileInfoType) => {
        return [
          new Label({ forAttr:name, text:header }),
          new Input({ id:value, class:'form-validate', name:name, type:'input', value:value }),
        ];
      },
    ).flat();
    ProfileList.push(new Button({ tag:'button', type:'submit', id:'form-btn', text:'Записать' }));

    super({
      ...props,
      Header: new Header({
        isProfilePage: '1',
        changePage: props.changePage,
      }),
      BoxHeader: new BoxHeader({
        header: 'Изменить данные',
      }),
      NavLineLeft: new NavLineLeft({
        name: 'Назад',
        nav: true,
        changePage: props.changePage,
      }),
      NavLineRight: new NavLineRight({
        nav: true,
        avatar: true,
        name: 'Ваш профиль',
      }),
      Form: new Form({
        id: 'form',
        class: 'info-box_content',
        children: ProfileList,
      }),
    });
  }

  override render() {
    return template;
  }
}
