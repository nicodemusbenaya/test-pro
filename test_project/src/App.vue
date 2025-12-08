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
  background: radial-gradient(circle at 10% 10%, #eef8ff 0%, #e6f2fb 30%, #eaf5ff 100%);
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
  padding: 28px 0; /* more breathing room */
}

.layout {
  width: 390px; /* mobile target width */
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, #ffffff 100%);
  box-shadow: 0 18px 40px rgba(16, 24, 40, 0.08);
  overflow: hidden;
  border: 1px solid rgba(16, 24, 40, 0.04);
}

/* internal layout spacing for pages handled inside views */
</style>
