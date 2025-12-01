export default `
        <section class="chats_top" data-page="profilePage">
            {{#if avatar}}<div class="top_avatar"></div>{{/if}}
            {{#if name}}<div class="top_name">{{ name }}</div>{{/if}}
            {{#if nav}}<div class="top_nav">></div>{{/if}}
            {{#if chatNav}}{{{ ChatNavBtn }}}{{/if}}
        </section>
`;
