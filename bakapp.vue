<template>
  <p>{{ data }}</p>
</template>

<script lang="ts" setup>
const query = gql`
  query GetTest {
    test {
      id
      created_at
      updated_at
      email
      name
      password
    }
  }
`;

const { data } = await useAsyncQuery(query);
</script>
