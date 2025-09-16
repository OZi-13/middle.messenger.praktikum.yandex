export default `
<div class="info-box_content">
    {{> Label forAttr="form-avatar" text="Загрузить новый аватар"}}
    {{> Input id="form-avatar" name="avatar" type="file" accept="image/png, image/jpeg"}}
    {{> Button id="form-btn" text="Загрузить" }}
</div>
`;