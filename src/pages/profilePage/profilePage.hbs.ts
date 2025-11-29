export default `
<div class="app">
{{{ Header }}}
<main>
    <div class="info-box info-box_600 info-box_white">
        <div class="info-box_header">
            {{{ ModalBtn }}}
            <img src="https://ya-praktikum.tech/api/v2/resources/84df667a-dd9a-4471-9b74-e397b928b402%2F35b01ee6-56f0-493a-a896-132377540100_2025-10-02_ava_706.jpg" />
            <h1>{{ UserName }}</h1>
        </div>
        <div class="info-box_content">
            <div class="info-list">
                {{{ ProfileList }}}
            </div>
            <div class="button-group button-group_2ps">
                {{{ ButtonData }}}
                {{{ ButtonPass }}}
            </div>
            {{{ Link }}}
        </div>
    </div>
</main>
{{{ ModalBox }}}
</div>
`;
