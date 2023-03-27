export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo"],

  ssr: true,
  target: "server",

  env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
    HASURA_API_KEY: process.env.HASURA_API_KEY,
    USER_TABLE: "test",
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: `${process.env.GRAPHQL_URL}`,
        httpLinkOptions: {
          headers: {
            "x-hasura-admin-secret": `${process.env.HASURA_API_KEY}`,
          },
        },
      },
    },
  },
});
