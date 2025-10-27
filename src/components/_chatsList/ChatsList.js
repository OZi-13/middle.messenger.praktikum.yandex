import './chatsList.pcss'

export default `
<div>
    <div class="chats_list_avatar"></div>
    <div class="chats_list_content">
        <h2>{{this.name}}</h2>
        <p>{{this.last}}</p>
    </div>
    {{#if this.newCount}}<div class="chats_list_new-count">{{this.newCount}}</div>{{/if}}
</div>
`
