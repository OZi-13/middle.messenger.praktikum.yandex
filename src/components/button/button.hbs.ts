export default `
<{{tag}} id="{{id}}"
{{#if type}} type="{{type}}" {{/if}}
{{#if class}}  class="{{class}}" {{/if}}
{{#if data-page}} data-page="{{data-page}}" {{/if}}
{{#if disabled}} disabled {{/if}}>
    {{text}}
</{{tag}}>
`
