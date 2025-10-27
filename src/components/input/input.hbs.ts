export default `
<input type="{{type}}" name="{{name}}"

{{#if id}} id="{{id}}" {{/if}}
{{#if class}} class="{{class}}" {{/if}}
{{#if value}} type="{{value}}" {{/if}}
{{#if placeholder}} type="{{placeholder}}" {{/if}}
>
`
