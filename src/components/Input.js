export default `
<input id="{{id}}" name="{{name}}" type="{{type}}" value="{{value}}"
{{#if placeholder}} placeholder="{{placeholder}}" {{/if}}
{{#if accept}} accept="{{accept}}" {{/if}}
>
`;