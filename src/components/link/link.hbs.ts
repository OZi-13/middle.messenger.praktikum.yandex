export default `
<a href="{{href}}" 
    {{#if id}} id="{{id}}" {{/if}}
    class="{{class}}" 
    {{#if dataPage}} data-page="{{dataPage}}" {{/if}}
>{{text}}</a>
`;
