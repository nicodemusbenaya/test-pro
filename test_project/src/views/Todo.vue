<template>
  <main class="main">
    <div class="container">
      <div class="header">
        <h1>Active Tasks</h1>
        <p class="count">{{ pendingTodos.length }} ongoing</p>
      </div>

      <!-- Form untuk menambah task -->
      <form @submit.prevent="handleAddTodo" class="add-form">
        <input v-model="todo.text" type="text" name="text" placeholder="Add a new task..." />
        <button :disabled="!todo.text" type="submit">Add</button>
      </form>

      <!-- Daftar tasks -->
      <div class="tasks-list">
        <div v-for="task in tasks" :key="task.id" class="task-card">
          <div class="task-content">
            <h3>{{ task.title }}</h3>
            <p class="task-description">{{ task.description }}</p>
            <div class="task-meta">
              <span class="priority" :class="task.priority">{{ task.priority }}</span>
              <span class="time">{{ task.time }}</span>
            </div>
          </div>
          <button class="complete-btn" @click="completeTask(task.id)">✓</button>
        </div>
      </div>

      <button class="add-btn">+</button>
    </div>
  </main>
</template>

<script>
import { useTodos } from '@/stores/todos'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'TodoView',
  data() {
    return {
      todo: {
        text: null,
        isCompleted: false,
      },
    }
  },
  computed: {
    ...mapState(useTodos, ['pendingTodos']),
    tasks() {
      return this.pendingTodos
    },
  },
  methods: {
    ...mapActions(useTodos, ['storeTodo', 'updateTodo', 'destroyTodo']),
    completeTask(taskId) {
      const task = this.pendingTodos.find((t) => t.id === taskId)
      if (task) {
        this.updateTodo({ ...task, isCompleted: true })
      }
    },
    handleAddTodo() {
      this.storeTodo(this.todo)
      this.todo.text = null
    },
  },
}
</script>

<style scoped>
.main {
  background-color: #ffffff;
  padding: 20px;
  font-family: Arial, Helvetica, sans-serif;
  min-height: 600px;
}

.container {
  position: relative;
}

.header {
  margin-bottom: 30px;
}

.header h1 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 28px;
}

.count {
  margin: 0;
  color: #999;
  font-size: 14px;
}

.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
}

.add-form input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.add-form button {
  padding: 8px 16px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.add-form button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.pending-section {
  margin-bottom: 20px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.pending-section h3 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #666;
}

.pending-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pending-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  font-size: 14px;
}

.pending-complete {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #32c18b;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pending-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.pending-remove {
  padding: 6px 10px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 60px;
}

.task-card {
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
  color: white;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.task-content {
  flex: 1;
}

.task-content h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
}

.task-description {
  margin: 0 0 12px 0;
  font-size: 14px;
  opacity: 0.9;
}

.task-meta {
  display: flex;
  gap: 15px;
  font-size: 12px;
}

.priority {
  padding: 3px 8px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.3);
}

.time {
  opacity: 0.8;
}

.complete-btn {
  background-color: rgba(255, 255, 255, 0.3);
  border: 2px solid white;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  margin-left: 15px;
  flex-shrink: 0;
}

.complete-btn:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.add-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
  color: white;
  border: none;
  font-size: 32px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(33, 150, 243, 0.4);
  transition: all 0.3s;
}

.add-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(33, 150, 243, 0.6);
}
</style>
