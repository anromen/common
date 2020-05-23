const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const { getUserId } = require('./utils');

const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');
const Collection = require('./resolvers/collection');
const User = require('./resolvers/user');

const resolvers = {
  Query,
  Mutation,
  Collection,
  User,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: ({ request }) => {
    const authorization = request.headers.authorization || '';
    const token = authorization.replace('Bearer ', '');

    const userId = getUserId(token);

    return { prisma, userId };
  },
});

server.start(() => console.log(`server is running at http://localhost:4000`));
