export default `
<div {{#if id}} id="{{id}}" {{/if}}
     {{#if class}} class="{{class}}" {{/if}}
     {{#if data-page}} data-page="{{data-page}}" {{/if}}
>{{text}}</div>
`;