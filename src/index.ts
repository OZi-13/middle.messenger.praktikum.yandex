import './style.pcss';
import App from './App.ts';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.render().catch(console.error);
});
