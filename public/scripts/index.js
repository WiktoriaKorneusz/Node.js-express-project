// const drawerBtnElement = document.getElementById('drawer-btn');
// const mobileDarwerElement = document.getElementById('mobile-drawer');

// function toggleDrawer() {
//   mobileDarwerElement.classList.toggle('open');
// }

// drawerBtnElement.addEventListener('click', toggleDrawer);
const btn = document.querySelector("#drawer-btn")
const nav = document.querySelector("nav")
const header = document.querySelector("header")
const openMenu = () => {
  btn.classList.toggle("open")
  nav.classList.toggle("nav-open")
  header.classList.toggle("header-open")
}

btn.addEventListener("click", openMenu);
