const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

const TicketType = new GraphQLObjectType({
  name: "ticket",
  fields: () => ({
    _id: { type: GraphQLString },
    code: { type: GraphQLString },
    trainnumber: { type: GraphQLString },
    traindate: { type: GraphQLString },
  }),
});

module.exports = TicketType;
