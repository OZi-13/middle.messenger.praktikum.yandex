export default `
<div class="user-list__item">
    <div class="user-list__avatar">
        {{#if avatar}}
            <img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="{{login}}">
        {{else}}
            <div class="user-list__avatar-placeholder"></div>
        {{/if}}
    </div>
    <div class="user-list__info">
        <div class="user-list__name">{{first_name}} {{second_name}}</div>
        <div class="user-list__login">@{{login}}</div>
    </div>
    {{{Button}}}
</div>
`;
