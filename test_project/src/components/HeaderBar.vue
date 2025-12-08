<template>
  <header class="header">
    <h1>Task Manager</h1>
  </header>
</template>

<script>
export default {
  name: 'HeaderBar',
}
</script>

<style>
.header {
  background: linear-gradient(135deg, #7ea8ff 0%, #91b7ff 100%);
  color: white;
  padding: 22px 16px;
  text-align: center;
  font-family: 'Segoe UI', Roboto, Arial, sans-serif;
  font-weight: 700;
  font-size: 22px;
  box-shadow: inset 0 -6px 12px rgba(255, 255, 255, 0.06);
}

.header h1 {
  margin: 0;
  letter-spacing: 0.4px;
}
</style>
