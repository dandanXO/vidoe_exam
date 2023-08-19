<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <div class="wrapper">
      <nav>
        <RouterLink to="/follow">Following</RouterLink>
        <RouterLink to="/">ForYou </RouterLink>
      </nav>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.wrapper {
    z-index: 1;
    position: fixed;
    top:0.2rem;
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
  }


nav {
  width: 100%;
  font-size: 2rem;
  text-align: center;
  margin-top: 0.6rem;
}

nav a.router-link-exact-active {
  color: rgb(255, 255, 255);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  /* transform: translateX(20px); */
  opacity: 0;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  .wrapper {
    position: fixed;
    top:3rem;
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
