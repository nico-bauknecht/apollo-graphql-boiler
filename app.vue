<template>
  <div>
    <input v-model="id" placeholder="ID" />
    <input v-model="name" placeholder="Name" />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" placeholder="Password" />
    <button @click="createUser">Create User</button>
    <button @click="updateUser">Update User</button>
    <p>{{}}</p>
  </div>
</template>

<script setup>
import { useMutation } from "@vue/apollo-composable";
import createUserMutation from "~/graphql/mutations/createUser.gql";
import updateUserMutation from "~/graphql/mutations/updateUser.gql";
import { ref } from "vue";

const { mutate } = useMutation(createUserMutation);

const id = ref("");
const name = ref("");
const email = ref("");
const password = ref("");
const message = ref("");

const createUser = async () => {
  const variables = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  try {
    await mutate(variables);
    message.value = "User created!";
  } catch (error) {
    console.error(error);
    message.value = "Error creating user.";
  }
};

const updateUser = async () => {
  const { mutate } = useMutation(updateUserMutation);
  const variables = {
    id: id.value,
    name: name.value,
    email: email.value,
    password: password.value,
  };
  try {
    await mutate(variables);
    message.value = "User updated!";
  } catch (error) {
    console.error(error);
    message.value = "Error updating user.";
  }
};
</script>
