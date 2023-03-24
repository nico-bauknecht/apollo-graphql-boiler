<template>
  <div>
    <input placeholder="Name" />
    <input placeholder="Email" />
    <input placeholder="Password" />
    <button @click="createUser">Create User</button>
    <p>{{}}</p>
  </div>
</template>

<script setup>
import { useMutation } from "@vue/apollo-composable";
import createUserMutation from "~/graphql/mutations/createUser.gql";

const { mutate } = useMutation(createUserMutation);

const createUser = async () => {
  console.log("User created!");
  const variables = {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
  };
  await mutate(variables);
};
</script>
