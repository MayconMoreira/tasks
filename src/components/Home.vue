<template>
  <div class="home">
    <h1>Tarefas</h1>
    <form @submit.prevent="getTask" class="task-form">
      <input v-model="taskTitle" type="text" placeholder="Título da tarefa" required />
      <textarea v-model="taskBody" placeholder="Descrição da tarefa" required></textarea>
      <button type="submit">Adicionar</button>
    </form>

    <div v-if="taskStore.loading" class="loading">Carregando...</div>
    <div v-if="taskStore.error" class="error">{{ taskStore.error }}</div>

    <div class="cards-container">
      <TaskCard
        v-for="(task) in taskStore.tasks"
        :key="task.id"
        :task="task"
        @remove="removeTask(task.id)"
        @update-task="updateTask(task.id, $event)"
      />
    </div>

    <Modal
      :isVisible="notificationStore.isVisible"
      :title="notificationStore.title"
      :message="notificationStore.message"
      @update:isVisible="notificationStore.isVisible = $event"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import { useNotificationStore } from '../stores/notificationStore';
import TaskCard from '../components/TaskCard.vue';
import Modal from '../components/Modal.vue';

export default {
  name: 'Home',
  components: {
    TaskCard,
    Modal
  },
  setup() {
    const taskTitle = ref('');
    const taskBody = ref('');
    const taskStore = useTaskStore();
    const notificationStore = useNotificationStore();

    const getTask = async () => {
      try {
        await taskStore.addTask({ title: taskTitle.value, body: taskBody.value });
        notificationStore.showNotification('Sucesso', 'Tarefa adicionada com sucesso!');
        taskTitle.value = '';
        taskBody.value = '';
      } catch (err) {
        notificationStore.showNotification('Erro', 'Falha ao adicionar tarefa.');
      }
    };

    const removeTask = async (taskId) => {
      try {
        await taskStore.removeTask(taskId);
        notificationStore.showNotification('Sucesso', 'Tarefa removida com sucesso!');
      } catch (err) {
        notificationStore.showNotification('Erro', 'Falha ao remover tarefa.');
      }
    };

    const updateTask = async (taskId, updatedTask) => {
      try {
        await taskStore.updateTask(taskId, updatedTask);
        notificationStore.showNotification('Sucesso', 'Tarefa atualizada com sucesso!');
      } catch (err) {
        notificationStore.showNotification('Erro', 'Falha ao atualizar tarefa.');
      }
    };

    onMounted(() => {
      taskStore.fetchTasks();
    });

    return {
      taskTitle,
      taskBody,
      getTask,
      removeTask,
      updateTask,
      taskStore,
      notificationStore
    };
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 40px 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
}
h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
}
.task-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}
input, textarea {
  padding: 12px;
  width: 100%;
  max-width: 600px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}
textarea {
  height: 100px;
  resize: vertical;
}
input:focus, textarea:focus {
  border-color: #3f51b5;
  outline: none;
}
button {
  padding: 12px 20px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #303f9f;
}
.loading {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
}
.error {
  color: red;
  margin-top: 20px;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
