export default `
<div class="chat_message member-{{ memberId }}">
    <div>
        {{#if content}}
            <div class="chat_message_text">{{ content }}</div>
            <div class="chat_message_time">{{ time }}</div>
        {{/if}}
    </div>
</div>
`;
