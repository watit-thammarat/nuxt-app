<template>
  <div>
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav;" />
    <TheSideNav :show="displaySidenav" @close="displaySidenav = false" />
    <nuxt/>
  </div>
</template>

<script>
import TheHeader from '~/components/Navigation/TheHeader.vue';
import TheSideNav from '~/components/Navigation/TheSideNav.vue';

export default {
  // middleware: ['log'],
  components: {
    TheHeader,
    TheSideNav
  },
  data: () => ({
    displaySidenav: false
  })
};
</script>

<style>
html {
  font-family: 'Open Sans', sans-serif;
}
body {
  margin: 0;
}
</style>