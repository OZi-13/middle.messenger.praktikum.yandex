export default `
<div id="modal_modal" class="modal {{ classBox }} none">
    {{#if content1 }}<div id="{{ id1 }}" class="none">{{{ content1 }}}</div>{{/if}}
    {{#if content2 }}<div id="{{ id2 }}" class="none">{{{ content2 }}}</div>{{/if}}
    {{#if content3 }}<div id="{{ id3 }}" class="none">{{{ content3 }}}</div>{{/if}}
    {{#if content4 }}<div id="{{ id3 }}" class="none">{{{ content4 }}}</div>{{/if}}
    {{#if content5 }}<div id="{{ id3 }}" class="none">{{{ content5 }}}</div>{{/if}}
</div>
`;
