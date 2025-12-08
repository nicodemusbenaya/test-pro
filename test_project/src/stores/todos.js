import { defineStore } from 'pinia'

export const useTodos = defineStore('useTodos', {
  state: () => ({
    nextId: 9,
    todos: [
      // Pending tasks
      {
        id: 1,
        text: 'Product Team Meeting',
        title: 'Product Team Meeting',
        description: 'Discuss quarterly goals',
        priority: 'high',
        time: '10:00 AM',
        isCompleted: false,
      },
      {
        id: 2,
        text: 'Design Article Writing',
        title: 'Design Article Writing',
        description: 'Write article about UI design',
        priority: 'medium',
        time: '2:00 PM',
        isCompleted: false,
      },
      {
        id: 3,
        text: 'Dev Team Catch Up',
        title: 'Dev Team Catch Up',
        description: 'Sync with development team',
        priority: 'high',
        time: '3:00 PM',
        isCompleted: false,
      },
      {
        id: 4,
        text: 'Send Email to Investors',
        title: 'Send Email to Investors',
        description: 'Monthly update email',
        priority: 'medium',
        time: '5:00 PM',
        isCompleted: false,
      },
      // Completed tasks
      {
        id: 5,
        text: 'Client Meeting Prep',
        title: 'Client Meeting Prep',
        description: 'Prepare presentation slides',
        priority: 'high',
        completedTime: '9:00 AM',
        isCompleted: true,
      },
      {
        id: 6,
        text: 'Database Optimization',
        title: 'Database Optimization',
        description: 'Optimize query performance',
        priority: 'high',
        completedTime: '11:30 AM',
        isCompleted: true,
      },
      {
        id: 7,
        text: 'Code Review',
        title: 'Code Review',
        description: 'Review pull requests',
        priority: 'medium',
        completedTime: '1:00 PM',
        isCompleted: true,
      },
      {
        id: 8,
        text: 'Documentation Update',
        title: 'Documentation Update',
        description: 'Update API documentation',
        priority: 'low',
        completedTime: '4:00 PM',
        isCompleted: true,
      },
    ],
  }),
  getters: {
    pendingTodos: (state) => {
      return state.todos.filter((todo) => !todo.isCompleted)
    },
    completedTodos: (state) => {
      return state.todos.filter((todo) => todo.isCompleted)
    },
  },
  actions: {
    storeTodo(payload) {
      // debug: log payload received to verify priority value

      console.log('storeTodo received payload:', payload)

      this.todos.push({
        id: this.nextId++,
        text: payload.text,
        title: payload.text,
        description: payload.description || 'New task',
        priority: payload.priority || 'medium',
        time: new Date().toLocaleTimeString(),
        isCompleted: false,
      })
    },

    updateTodo(payload) {
      const index = this.todos.findIndex((item) => item.id == payload.id)
      if (index !== -1) {
        this.todos[index] = {
          ...this.todos[index],
          text: payload.text !== undefined ? payload.text : this.todos[index].text,
          isCompleted:
            payload.isCompleted !== undefined ? payload.isCompleted : this.todos[index].isCompleted,
          description:
            payload.description !== undefined ? payload.description : this.todos[index].description,
          priority: payload.priority !== undefined ? payload.priority : this.todos[index].priority,
          completedTime:
            payload.completedTime !== undefined
              ? payload.completedTime
              : this.todos[index].completedTime,
        }
      }
    },

    destroyTodo(id) {
      const index = this.todos.findIndex((item) => item.id == id)
      if (index > -1 && index < this.todos.length) {
        this.todos.splice(index, 1)
      }
    },

    destroyAllCompleted() {
      // remove all todos where isCompleted is true
      const before = this.todos.length
      this.todos = this.todos.filter((t) => !t.isCompleted)

      console.log(`destroyAllCompleted removed ${before - this.todos.length} items`)
    },
  },
})
