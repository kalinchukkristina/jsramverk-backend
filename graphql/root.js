const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const CodeType = require("./code");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: {
    codes: {
      type: new GraphQLList(CodeType),
      resolve: async () => {
        const query = `<REQUEST>
          <LOGIN authenticationkey="${process.env.TRAFIKVERKET_API_KEY}" />
          <QUERY objecttype="ReasonCode" schemaversion="1">
            <INCLUDE>Code</INCLUDE>
            <INCLUDE>Level1Description</INCLUDE>
            <INCLUDE>Level2Description</INCLUDE>
            <INCLUDE>Level3Description</INCLUDE>
          </QUERY>
        </REQUEST>`;

        const response = await fetch(
          "https://api.trafikinfo.trafikverket.se/v2/data.json",
          {
            method: "POST",
            body: query,
            headers: { "Content-Type": "text/xml" },
          }
        );

        const result = await response.json();
        return result.RESPONSE.RESULT[0].ReasonCode || [];
      },
    },
  },
});

module.exports = RootQueryType;
