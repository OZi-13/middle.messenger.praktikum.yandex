export default `
        <div class="chats_top">
            {{#if avatar }}<div class="top_avatar"></div>{{/if}}
            {{#if name }}<div class="top_name">{{ name }}</div>{{/if}}
            {{#if nav}}<div class="top_nav">></div>{{/if}}
        </div>
`