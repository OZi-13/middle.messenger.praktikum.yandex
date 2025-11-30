export default `
<div>
    <div class="chats_list_avatar"></div>
    <div class="chats_list_content">
        <h2>{{ title }}</h2>
        <p><b>{{ last_message_user_name }}:</b> {{ content }}</p>
    </div>
    {{#if unread_count }}<div class="chats_list_new-count">{{ unread_count }}</div>{{/if}}
</div>
`;
