export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo"],

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
