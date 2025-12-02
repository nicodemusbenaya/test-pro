<template>
  <div class="app-root">
    <div class="layout">
      <HeaderBar />
      <MainContent />
      <RouterView />
      <FooterBar />
    </div>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'
import MainContent from './components/MainContent.vue'
import FooterBar from './components/FooterBar.vue'

export default {
  name: 'App',
  components: {
    HeaderBar,
    MainContent,
    FooterBar,
  },
}
</script>

<style>
/* global mobile-first theme */
html,
body,
#app {
  height: 100%;
  margin: 0;
  background: #eaf5ff; /* page background per theme */
  font-family:
    Inter,
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial;
}

.app-root {
  display: flex;
  justify-content: center;
  padding: 18px 0; /* top/bottom safe spacing */
}

.layout {
  width: 390px; /* mobile target width */
  border-radius: 18px;
  background: #ffffff; /* card background */
  box-shadow: 0 10px 30px rgba(16, 24, 40, 0.06);
  overflow: hidden;
}

/* internal layout spacing for pages handled inside views */
</style>
