<template>
    <div v-if="isVisible" class="modal-overlay" @click="close">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="close">&times;</button>
        <h2 class="modal-title">{{ title }}</h2>
        <p class="modal-message">{{ message }}</p>
        <button class="modal-button" @click="close">OK</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      title: {
        type: String,
        default: ''
      },
      message: {
        type: String,
        default: ''
      }
    },
    methods: {
      close() {
        this.$emit('update:isVisible', false);
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    position: relative;
  }
  .modal-title {
    font-size: 1.8rem;
    margin-bottom: 15px;
    font-weight: bold;
    color: #333;
  }
  .modal-message {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #666;
  }
  .modal-button {
    background-color: #3f51b5;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 10px 15px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  .modal-button:hover {
    background-color: #303f9f;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  </style>
  