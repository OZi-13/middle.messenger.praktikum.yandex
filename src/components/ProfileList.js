export default `
<div class="info-list">
    {{#each profileInfo}}
    <div>
        <div class="info-list_header">{{ this.header }}</div>
        <div class="info-list_value">{{ this.value }}</div>
    </div>
    {{/each}}
</div>
`
