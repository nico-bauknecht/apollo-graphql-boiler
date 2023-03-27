<template>
  <div>
    <input v-model="id" placeholder="ID" />
    <input v-model="name" placeholder="Name" />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" placeholder="Password" />
    <button @click="createUser">Create User</button>
    <button @click="updateUser">Update User</button>
    <button @click="loginUser">Login</button>
    <button @click="logoutUser">Logout</button>
    <button @click="logToken">Console Log Token</button>
    <div>
      <p v-if="isLoggedIn">
        Logged in as: {{ loginToken.name }} with email: {{ loginToken.email }}
      </p>
      <p v-else>Logged out</p>
    </div>
  </div>
</template>

<script setup>
import { useMutation } from "@vue/apollo-composable";
import createUserMutation from "~/graphql/mutations/createUser.gql";
import updateUserMutation from "~/graphql/mutations/updateUser.gql";
import loginUserMutation from "~/graphql/queries/loginUser.gql";
import { ref, computed } from "vue";
import cookie from "cookie-universal-nuxt";

const id = ref("");
const name = ref("");
const email = ref("");
const password = ref("");
const loginToken = ref("");
const isLoggedIn = computed(() => {
  return (
    useCookie("loginToken") !== null && useCookie("loginToken") !== undefined
  );
});

const createUser = async () => {
  const { mutate } = useMutation(createUserMutation);
  const variables = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  try {
    await mutate(variables);
    console.log("User created!");
  } catch (error) {
    console.error(error);
    console.log("Error creating user.");
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
    const result = await mutate(variables);
    const { id, name, email } = result.data.users_by_pk;
    console.log(`User ${name} with ID ${id} and email ${email} updated!`);
  } catch (error) {
    console.error(error);
    console.log("Error updating user.");
  }
};

const loginUser = async () => {
  const { mutate } = useMutation(loginUserMutation);
  const variables = {
    name: name.value,
    password: password.value,
  };
  try {
    const result = await mutate(variables);
    const { id, name, email } = result.data.users_by_pk;
    var loginToken = result.data.users_by_pk;
    useCookie("loginToken", JSON.stringify(loginToken));
    isLoggedIn.value = true;
    console.log(
      `User ${name} with ID ${id} and email ${email} logged in successfully`
    );
  } catch (error) {
    console.error(error);
    console.log("Error logging in user.");
  }
  return loginToken;
};

const logoutUser = async () => {
  localStorage.removeItem("loginToken");
  console.log("User logged out.");
};

const logToken = async () => {
  var tmpCookie = getCookie("loginToken");
  console.log(tmpCookie);
};
</script>
