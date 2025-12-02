<template>
  <main class="main">
    <div class="container">
      <div class="header">
        <h1>Completed Tasks</h1>
        <p class="count">{{ completedTodos.length }} completed</p>
      </div>
      <div class="tasks-list">
        <div v-for="task in tasks" :key="task.id" class="task-card completed">
          <div class="task-content">
            <h3>{{ task.title }}</h3>
            <p class="task-description">{{ task.description }}</p>
            <div class="task-meta">
              <span class="priority" :class="task.priority">{{ task.priority }}</span>
              <span class="time">{{ task.completedTime }}</span>
            </div>
          </div>
          <button class="restore-btn" @click="restoreTask(task.id)">↻</button>
          <button class="delete-btn" @click="deleteTask(task.id)">🗑</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useTodos } from '@/stores/todos'

export default {
  name: 'CompletedPage',
  computed: {
    ...mapState(useTodos, ['completedTodos']),
    tasks() {
      return this.completedTodos
    },
  },
  methods: {
    ...mapActions(useTodos, ['updateTodo', 'destroyTodo']),
    restoreTask(taskId) {
      const task = this.completedTodos.find((t) => t.id === taskId)
      if (task) {
        this.updateTodo({ ...task, isCompleted: false })
      }
    },
    deleteTask(taskId) {
      if (confirm('Are you sure you want to permanently delete this task?')) {
        this.destroyTodo(taskId)
      }
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

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  transition: all 0.3s;
}

.task-card.completed {
  background: linear-gradient(135deg, #90ee90 0%, #76d776 100%);
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
  text-decoration: line-through;
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

.restore-btn {
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

.restore-btn:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.delete-btn {
  background-color: rgba(255, 100, 100, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  margin-left: 8px;
  flex-shrink: 0;
}

.delete-btn:hover {
  background-color: rgba(255, 76, 76, 0.8);
}
</style>
