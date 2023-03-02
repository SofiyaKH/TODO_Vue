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
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

//firestore ref
const todosCollectionRef = collection(db, "todos");

//todo
const todos = ref([

]);

// get todos
onMounted(() => {
  onSnapshot(todosCollectionRef, (querySnapshot) => {
    const FBtodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      FBtodos.push(todo);
    });
    todos.value = FBtodos;
  });
});

// add to do
const newToDoContent = ref("");

const addToDO = () => {
  addDoc(todosCollectionRef, {
    content: newToDoContent.value,
    done: false,
  });

  newToDoContent.value = "";
};

//delete todo
const deleteToDo = (id) => {
  deleteDoc(doc(todosCollectionRef, id));
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