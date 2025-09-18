export default `
            <div class="chat_date"><span>{{chat.date}}</span></div>
            {{#each chat.messages}}
                <div class="chat_message member-{{this.member}}">
                    <div>
                    {{#if this.image}}
                        <img src="{{this.image}}"/>
                        <div class="chat_message_time">{{this.time}}</div>
                    {{/if}}
                    {{#if this.text}}
                        <div class="chat_message_text">{{this.text}}</div>
                        <div class="chat_message_time">{{this.time}}</div>
                    {{/if}}
                    </div>
                </div>
            {{/each}}
`
