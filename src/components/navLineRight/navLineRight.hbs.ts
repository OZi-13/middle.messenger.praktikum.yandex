export default `
        <section class="chats_top nav-btn" data-page="profilePage">
            {{#if avatar}}<div class="top_avatar"></div>{{/if}}
            {{#if name}}<div class="top_name" data-page="profilePage">{{ name }}</div>{{/if}}
            {{#if nav}}<div class="top_nav" data-page="profilePage">></div>{{/if}}
        </section>
`;
