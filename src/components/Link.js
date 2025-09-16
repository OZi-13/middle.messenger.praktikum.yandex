export default `<a href="{{href}}"
                   {{#if id}} id="{{id}}" {{/if}}
                   {{#if class}} class="{{class}} {{active}}" {{/if}}
                   data-page="{{data-page}}">{{text}}</a>`;