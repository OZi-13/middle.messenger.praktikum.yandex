export default `
<div id="modal_modal" class="modal {{ classBox }} none">
    {{#if modalContent1 }}<div id="{{{ id1 }}}" class="none">{{{ modalContent1 }}}</div>{{/if}}
    {{#if modalContent2 }}<div id="{{{ id2 }}}" class="none">{{{ modalContent2 }}}</div>{{/if}}
    {{#if modalContent3 }}<div id="{{{ id3 }}}" class="none">{{{ modalContent3 }}}</div>{{/if}}
    {{#if modalContent4 }}<div id="{{{ id4 }}}" class="none">{{{ modalContent4 }}}</div>{{/if}}
    {{#if modalContent5 }}<div id="{{{ id5 }}}" class="none">{{{ modalContent5 }}}</div>{{/if}}
</div>
`;
