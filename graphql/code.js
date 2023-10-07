const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

const CodeType = new GraphQLObjectType({
  name: "Code",
  fields: () => ({
    Code: { type: GraphQLString },
    Level1Description: { type: GraphQLString },
    Level2Description: { type: GraphQLString },
    Level3Description: { type: GraphQLString },
  }),
});

module.exports = CodeType;
