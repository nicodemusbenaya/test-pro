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
  background: #fafafa;
  padding: 12px 16px;
  text-align: center;
  font-family: 'Segoe UI', Roboto, Arial, sans-serif;
  display: flex;
  justify-content: center;
  gap: 14px;
  border-bottom: 1px solid rgba(16, 24, 40, 0.04);
}

.nav-link {
  text-decoration: none;
  color: #2b9f6a;
  font-weight: 700;
  padding: 8px 14px;
  border-radius: 999px;
  transition: all 0.18s ease;
  box-shadow: 0 4px 10px rgba(43, 159, 106, 0.08);
}

.nav-link:hover {
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  background: linear-gradient(135deg, #2b9f6a, #28a06a);
  color: white;
  box-shadow: 0 8px 18px rgba(43, 159, 106, 0.12);
}
</style>
