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

    <div
      v-for="todo in todos"
      :key="todo.id"
      class="card mb-5"
      :class="{ 'has-background-success-light': todo.done }"
    >
      <div class="card-content">
        <div class="content">
          <div
            class="columns is-mobile is-vcentered is-justify-content-space-between"
          >
            <div
              class="columm"
              :class="{ 'has-text-success line-through': todo.done }"
            >
              {{ todo.content }}
            </div>
            <div class="columm">
              <button
                @click="togglerDone(todo.id)"
                class="button"
                :class="todo.done ? 'is-success' : 'is-light'"
              >
                &check;
              </button>
              <button
                @click="deleteToDo(todo.id)"
                class="button is-danger ml-2"
              >
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//import
import { ref, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

//todo
const todos = ref([
  // { id: "id1", content: "hello", done: false },
  // { id: "id2", content: "check", done: true },
]);

// get todos
onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "todos"));
  let firebaseTodos = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    const todo = {
      id: doc.id,
      content: doc.data().content,
      done: doc.data().done,
    };
    firebaseTodos.push(todo);
  });
  todos.value = firebaseTodos;
});

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

//delete todo
const deleteToDo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
  console.log("delete", id);
};

// toggle done
const togglerDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id == id);
  console.log(todos.value);
  todos.value[index].done = !todos.value[index].done;
};
</script>

<style>
@import "bulma/css/bulma.min.css";

.wrapper__todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}
</style>