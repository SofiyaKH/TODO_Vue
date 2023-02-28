<template>
  <div class="wrapper__todo">
    <div class="title has-text-centered">My ToDo List</div>

    <form @submit.prevent="addToDO">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input
            v-model="newToDoContent"
            class="input"
            type="text"
            placeholder="Add a todo "
          />
        </p>
        <p class="control">
          <button
            :disabled="!newToDoContent"
            type="submit"
            class="button is-info"
          >
            OK
          </button>
        </p>
      </div>
    </form>

    <div v-for="todo in todos" :key="todo.id" class="card mb-5">
      <div class="card-content">
        <div class="content">
          <div
            class="columns is-mobile is-vcentered is-justify-content-space-between"
          >
            <div class="columm">{{ todo.content }}</div>
            <div class="columm">
              <button class="button is-light">&check;</button>
              <button class="button is-danger ml-2">&cross;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//import
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

//todo
const todos = ref([
  // { id: "id1", content: "hello", done: false },
  // { id: "id2", content: "check", done: false },
]);

// add to do
const newToDoContent = ref("");

const addToDO = () => {
  const newToDo = {
    id: uuidv4(),
    content: newToDoContent.value,
    done: false,
  };
  todos.value.push(newToDo);
  newToDoContent.value = "";
  console.log("Отправлено", newToDo);
};
</script>

<style>
@import "bulma/css/bulma.min.css";

.wrapper__todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
</style>