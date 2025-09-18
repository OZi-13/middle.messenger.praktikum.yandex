export default `
<header>
<div id="logo"></div>
<nav id="nav-top">
  {{> Link href="#" class="nav-btn" active=isLoginPage data-page="loginPage" text="Войти"}}
  {{> Link href="#" class="nav-btn" active=isRegistrationPage data-page="registrationPage" text="Регистрация"}}
  {{> Link href="#" class="nav-btn" active=isChatsPage data-page="chatsPage" text="Чаты"}}
  {{> Link href="#" class="nav-btn" active=isProfilePage data-page="profilePage" text="Профиль"}}
  {{> Link href="#" class="nav-btn" active=isNoPage data-page="noPage" text="404"}}
  {{> Link href="#" class="nav-btn" active=isNoServerPage data-page="noServerPage" text="5**"}}
</nav>
</header>
`
