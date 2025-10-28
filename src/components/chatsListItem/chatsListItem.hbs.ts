export default `
<div>
    <div class="chats_list_avatar"></div>
    <div class="chats_list_content">
        <h2>{{ name }}</h2>
        <p>{{ last }}</p>
    </div>
    {{#if newCount }}<div class="chats_list_new-count">{{ newCount }}</div>{{/if}}
</div>
`
