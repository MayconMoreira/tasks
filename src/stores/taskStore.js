import { defineStore } from 'pinia';
import axios from 'axios';
import { useNotificationStore } from './notificationStore';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchTasks() {
      this.loading = true;
      this.error = null;
      const notificationStore = useNotificationStore();
      try {
        const response = await axios.get(API_URL);
        this.tasks = response.data;
      } catch (err) {
        this.error = 'Failed to fetch tasks.';
        notificationStore.showNotification('Erro', this.error);
      } finally {
        this.loading = false;
      }
    },
    async addTask(task) {
      this.loading = true;
      this.error = null;
      const notificationStore = useNotificationStore();
      try {
        const response = await axios.post(API_URL, task);
        this.tasks.unshift(response.data);
        notificationStore.showNotification('Sucesso', 'Tarefa adicionada com sucesso!');
      } catch (err) {
        this.error = 'Failed to add task.';
        notificationStore.showNotification('Erro', this.error);
      } finally {
        this.loading = false;
      }
    },
    async removeTask(taskId) {
      this.loading = true;
      this.error = null;
      const notificationStore = useNotificationStore();
      try {
        await axios.delete(`${API_URL}/${taskId}`);
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        notificationStore.showNotification('Sucesso', 'Tarefa removida com sucesso!');
      } catch (err) {
        this.error = 'Failed to remove task.';
        notificationStore.showNotification('Erro', this.error);
      } finally {
        this.loading = false;
      }
    },
    async updateTask(taskId, updatedTask) {
      this.loading = true;
      this.error = null;
      const notificationStore = useNotificationStore();
      try {
        await axios.put(`${API_URL}/${taskId}`, updatedTask);
        this.tasks = this.tasks.map(task =>
          task.id === taskId ? { ...task, ...updatedTask } : task
        );
        notificationStore.showNotification('Sucesso', 'Tarefa atualizada com sucesso!');
      } catch (err) {
        this.error = 'Failed to update task.';
        notificationStore.showNotification('Erro', this.error);
      } finally {
        this.loading = false;
      }
    }
  }
});
