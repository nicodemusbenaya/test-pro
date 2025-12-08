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
        <!-- description input placed under the title -->
        <textarea
          v-model="todo.description"
          class="desc-input"
          placeholder="Task description..."
          rows="2"
        ></textarea>
        <select v-model="todo.priority" class="priority-select">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div class="selected-badge" role="status" aria-label="Priority label">Priority</div>
        <button :disabled="!todo.text" type="submit">Add</button>
      </form>

      <!-- Daftar tasks -->
      <div class="tasks-list">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="task-card"
          :class="`priority-${task.priority}`"
        >
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
        description: null,
        priority: 'medium',
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
      if (this.todo.text && this.todo.text.trim()) {
        // debug: log what will be stored so we can confirm priority

        console.log('Adding todo:', this.todo)
        // pass priority explicitly to avoid any unexpected mutation
        this.storeTodo({
          ...this.todo,
          priority: this.todo.priority || 'medium',
        })
        this.todo = {
          text: null,
          description: null,
          priority: 'medium',
          isCompleted: false,
        }
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
  margin-bottom: 18px;
  background: linear-gradient(135deg, #7ea8ff 0%, #91b7ff 100%);
  padding: 20px 16px;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  box-shadow: 0 8px 20px rgba(46, 83, 160, 0.06);
}

.header h1 {
  margin: 0 0 6px 0;
  color: #fff;
  font-size: 26px;
  font-weight: 700;
}

.count {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
}

.add-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  padding: 14px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid rgba(16, 24, 40, 0.04);
  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.04);
}

.add-form input {
  flex: 1 1 auto;
  min-width: 0;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.add-form input:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  background: white;
}

.priority-select {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  font-size: 13px;
  cursor: pointer;
  color: #374151;
  font-weight: 500;
  transition: all 0.3s ease;
  flex: 0 0 110px;
  min-width: 90px;
}

.selected-badge {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  background: #f3f6fb;
  border-radius: 8px;
  color: #1f2937;
  font-weight: 700;
  font-size: 13px;
}

.priority-select:hover {
  border-color: #9ca3af;
}

.priority-select:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.desc-input {
  flex-basis: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 44px;
}

.add-form button {
  padding: 10px 16px;
  background: linear-gradient(135deg, #3f8efc 0%, #1f78f0 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
  flex: 0 0 auto;
  white-space: nowrap;
}

.add-form button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
}

.add-form button:active:not(:disabled) {
  transform: translateY(0);
}

.add-form button:disabled {
  background: linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%);
  cursor: not-allowed;
  opacity: 0.6;
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
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  color: #0b2540;
  padding: 18px;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 24px rgba(16, 24, 40, 0.06);
  transition:
    transform 0.25s,
    box-shadow 0.25s;
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
  background-color: #ffffff;
  border: 2px solid rgba(16, 24, 40, 0.06);
  color: #1f8a4a;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin-left: 12px;
  flex-shrink: 0;
  font-weight: 600;
}

.complete-btn:hover {
  background-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.complete-btn:active {
  transform: scale(0.95);
}

.add-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
  color: white;
  border: none;
  font-size: 32px;
  cursor: pointer;
  box-shadow:
    0 4px 12px rgba(33, 150, 243, 0.4),
    0 8px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-btn:hover {
  transform: scale(1.12) translateY(-2px);
  box-shadow:
    0 6px 16px rgba(33, 150, 243, 0.5),
    0 12px 24px rgba(0, 0, 0, 0.15);
}

.add-btn:active {
  transform: scale(1.05) translateY(0);
}

/* Priority-based task card colors */
.task-card.priority-high {
  background: linear-gradient(135deg, #ffecec 0%, #ffdede 100%);
}

.task-card.priority-medium {
  background: linear-gradient(135deg, #eaf3ff 0%, #dfeeff 100%);
}

.task-card.priority-low {
  background: linear-gradient(135deg, #e9fbef 0%, #dff6e8 100%);
}

.task-card.priority-high:hover,
.task-card.priority-medium:hover,
.task-card.priority-low:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Responsive tweaks */
@media (max-width: 420px) {
  .add-form {
    gap: 8px;
  }

  .priority-select {
    flex: 0 0 100px;
    min-width: 80px;
  }

  .add-form input {
    flex-basis: 100%;
  }

  .complete-btn {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }

  .add-btn {
    width: 48px;
    height: 48px;
    font-size: 28px;
    bottom: 18px;
    right: 18px;
  }
}
</style>
