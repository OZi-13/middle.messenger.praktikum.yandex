export default `
<input type="{{type}}" name="{{name}}"

{{#if id}} id="{{id}}" {{/if}}
{{#if class}} class="{{class}}" {{/if}}
{{#if value}} value="{{value}}" {{/if}}
{{#if placeholder}} placeholder="{{placeholder}}" {{/if}}
>
`
