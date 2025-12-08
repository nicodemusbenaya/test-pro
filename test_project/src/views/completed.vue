<template>
  <main class="main">
    <div class="container">
      <div class="header">
        <h1>Completed Tasks</h1>
        <p class="count">{{ completedTodos.length }} completed</p>
        <button v-if="completedTodos.length" class="delete-all-btn" @click="deleteAllCompleted">
          Delete All
        </button>
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
    ...mapActions(useTodos, ['updateTodo', 'destroyTodo', 'destroyAllCompleted']),
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
    deleteAllCompleted() {
      if (confirm('Are you sure you want to permanently delete ALL completed tasks?')) {
        this.destroyAllCompleted()
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
  margin-bottom: 24px;
  background: linear-gradient(135deg, #91b7ff 0%, #7ea8ff 100%);
  padding: 18px 16px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(46, 83, 160, 0.08);
}

.header h1 {
  margin: 0 0 6px 0;
  color: #ffffff;
  font-size: 28px;
}
.count {
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
  font-size: 13px;
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
  /* lighter green background but darker text for contrast */
  background: linear-gradient(135deg, #eefaf0 0%, #dff4df 100%);
  color: #08391a; /* dark green text */
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
  color: inherit; /* use the card text color for better contrast */
}

.task-description {
  margin: 0 0 12px 0;
  font-size: 14px;
  opacity: 0.95;
  color: inherit;
}

.task-meta {
  display: flex;
  gap: 15px;
  font-size: 12px;
}

.priority {
  padding: 4px 10px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.95);
  color: #08391a;
  font-weight: 700;
}

.time {
  opacity: 0.8;
}

.restore-btn {
  background: #fff;
  color: #0aa66a; /* icon color */
  border: 2px solid rgba(10, 166, 106, 0.12);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-left: 8px;
  flex-shrink: 0;
  font-weight: 600;
}

.restore-btn:hover {
  transform: scale(1.06);
  box-shadow: 0 4px 10px rgba(10, 166, 106, 0.12);
}

.delete-btn {
  background: #fff;
  color: #ff5b5b; /* icon color */
  border: 2px solid rgba(255, 91, 91, 0.12);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-left: 8px;
  flex-shrink: 0;
  font-weight: 600;
}

.delete-btn:hover {
  transform: scale(1.06);
  box-shadow: 0 4px 10px rgba(255, 91, 91, 0.12);
}

.delete-btn:active {
  transform: scale(0.95);
}

.delete-all-btn {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 14px;
  background: linear-gradient(135deg, #ff7b7b 0%, #ff6b6b 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 6px 14px rgba(255, 107, 107, 0.18);
}

.delete-all-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 107, 107, 0.2);
}

.delete-all-btn:active {
  transform: translateY(0);
}
</style>
