<template>
  <div class ="layout">
    <HeaderBar />
    <MainContent />
    <FooterBar />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';
import MainContent from './components/MainContent.vue';
import FooterBar from './components/FooterBar.vue';

export default {
  name: 'App',
  components: {
    HeaderBar,
    MainContent,
    FooterBar
  }
};
</script>

<style>
.layout{
  max-width: 600px;
  margin: 50px auto;
  border: 2px solid #42b983;
  border-radius: 10px;
  background: white;
  box-shadow: 0 4px 10px rgba(18, 18, 23, 0.15);

}

</style>