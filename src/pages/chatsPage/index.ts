import {PageName} from '../../App';
import template from './chatsPage.hbs.ts';

import { Header } from '../../components/header';
import { NavLine1 } from '../../components/navLine1';
import { NavLine2 } from '../../components/navLine2';
import { ChatsList } from '../../components/chatsList';
import { Chat } from '../../components/chat';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { Button } from '../../components/button';

/*
{{> Header isChatsPage="active"}}
{{> NavLine1 name="Ольга" avatar=1 nav=1 }}
{{> Input id="search" name="search" type="input" placeholder="Поиск"}}
{{> ChatsList chats=this}}
{{> NavLine2 name="Собеседник" avatar=1 nav=1 }}
{{> Chat chat=chatContent}}
{{{ form id="form" class="chats_bottom" template = 'formMessage'}}}
    {{> Input id="message" name="message" type="input" placeholder="Сообщение"}}
    {{> Button tag="button" type="submit" id="form-btn" text=">" }}
*/