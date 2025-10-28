export default `
<div class="chat_date-box">
    {{#each chat}}
    {{messageImage}}
            <div class="chat_date"><span>{{this.date}}</span></div>
            {{#each this.chat}}
                <div class="chat_message member-{{this.member}}">
                {{#each this.messages}}
                    <div>
                    {{#if this.image}}
                        <img src="{{ this.image }}"/>
                        <div class="chat_message_time">{{this.time}}</div>
                    {{/if}}
                    {{#if this.text}}
                        <div class="chat_message_text">{{this.text}}</div>
                        <div class="chat_message_time">{{this.time}}</div>
                    {{/if}}
                    </div>
                {{/each}}    
                </div>
            {{/each}}
    {{/each}}
</div>
`