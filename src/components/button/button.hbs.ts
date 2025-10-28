export default `
<{{tag}} 
{{#if id}} id="{{id}}" {{/if}}
{{#if type}} type="{{type}}" {{/if}}
{{#if class}}  class="{{class}}" {{/if}}
{{#if dataPage}} data-page="{{dataPage}}" {{/if}}
{{#if disabled}} disabled {{/if}}>
    {{#if text}} {{text}} {{/if}}
</{{tag}}>
`;
