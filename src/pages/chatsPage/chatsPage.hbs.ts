export default `
<div class="app">
    {{{ Header }}}
    <main id="main-box">
        <div class="main-box_left">
            {{{ NavLineLeft }}}
            <div class="chats_content">
                {{{ InputSearch }}}
                <div class="content_box">
                    {{{ ChatsListItem }}}
                </div>
            </div>
        </div>
        <div class="main-box_right">
            {{{ NavLineRight }}}
            <div class="chats_content">
                {{{ Chat }}}
            </div>
            {{{ Form }}}
        </div>
    </main>
</div>
`;
