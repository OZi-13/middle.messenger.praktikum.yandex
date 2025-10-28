export default `
        <div class="chats_top nav-btn" data-page="profilePage">
            {{#if nav}}<div class="top_nav"><</div>{{/if}}
            
            {{#if name}}<div class="top_name" data-page="profilePage">{{ name }}</div>{{/if}}
            {{#if avatar}}<div class="top_avatar"></div>{{/if}}
        </div>
`;