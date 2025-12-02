<template>
  <nav class="nav">
    <RouterLink to="/" class="nav-link">Active</RouterLink>
    <RouterLink to="/today" class="nav-link">Today</RouterLink>
  </nav>
</template>

<script>
export default {
  name: 'MainContent',
}
</script>

<style>
.nav {
  background-color: #f5f5f5;
  padding: 15px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  justify-content: center;
  gap: 20px;
  border-bottom: 1px solid #ddd;
}

.nav-link {
  text-decoration: none;
  color: #42b983;
  font-weight: bold;
  padding: 8px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #e8f5e9;
}

.nav-link.router-link-active {
  background-color: #42b983;
  color: white;
}
</style>
