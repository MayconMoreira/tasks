import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    isVisible: false,
    title: '',
    message: ''
  }),
  actions: {
    showNotification(title, message) {
      this.title = title;
      this.message = message;
      this.isVisible = true;
      setTimeout(() => {
        this.isVisible = false;
      }, 3000); // Duração da notificação
    }
  }
});
