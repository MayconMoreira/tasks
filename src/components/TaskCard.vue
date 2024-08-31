<template>
  <div class="task-card">
    <div class="task-content">
      <div v-if="!isEditing">
        <h2 class="task-title">{{ task.title }}</h2>
        <p class="task-body">{{ task.body }}</p>
      </div>

      <div v-else>
        <input v-model="editedTitle" type="text" placeholder="Título da tarefa" />
        <textarea v-model="editedBody" placeholder="Descrição da tarefa"></textarea>
      </div>
    </div>

    <div class="card-actions">
      <button v-if="!isEditing" class="edit-btn" @click="startEdit">Editar</button>
      <button v-if="!isEditing" class="remove-btn" @click="confirmRemove">Remover</button>
      <button v-if="isEditing" @click="confirmEdit">Confirmar</button>
      <button v-if="isEditing" @click="cancelEdit">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      editedTitle: this.task.title,
      editedBody: this.task.body
    };
  },
  methods: {
    startEdit() {
      this.isEditing = true;
    },
    confirmEdit() {
      this.$emit('update-task', { title: this.editedTitle, body: this.editedBody });
      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
      this.editedTitle = this.task.title;
      this.editedBody = this.task.body;
    },
    confirmRemove() {
      if (confirm('Tem certeza de que deseja remover esta tarefa?')) {
        this.$emit('remove');
      }
    }
  }
};
</script>

<style scoped>
.task-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  padding: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.task-card .task-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-card input, .task-card textarea {
  width: calc(100% - 16px);
  padding: 12px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.task-card textarea {
  height: 120px;
  resize: vertical;
}

.task-card .task-title {
  font-size: 1.6rem;
  margin: 0;
  font-weight: 600;
}

.task-card .task-body {
  font-size: 1.1rem;
  margin: 0;
  color: #666;
}

.task-card .task-content {
  margin-bottom: 50px;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: calc(100% - 20px);
}

.card-actions button {
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.card-actions .remove-btn {
  background-color: #f44336;
}

.card-actions button:hover {
  background-color: #303f9f;
  transform: scale(1.05);
}

.card-actions button:active {
  transform: scale(0.98);
}
</style>
