export default `
<div class="chat_message {{messageClass}}">
    <div>
        {{#if content}}
            <div class="chat_message_text">{{content}}</div>
        {{/if}}
        <div class="chat_message_time">{{time}}</div>
    </div>
</div>
`;
