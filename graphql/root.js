const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");
const Ticket = require("./../models/ticketSchema");

const CodeType = require("./code");
const TicketType = require("./ticket");

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
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
    tickets: {
      type: new GraphQLList(TicketType),
      resolve: async () => {
        try {
          const tickets = await Ticket.find().sort({ _id: -1 });
          return tickets;
        } catch (error) {
          throw new Error("Failed to fetch tickets: " + error.message);
        }
      },
    },
    delayed: {
      type: GraphQLString,
      resolve: () => "all delayed trains",
    },
  },
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTicket: {
      type: TicketType,
      args: {
        code: { type: GraphQLString },
        trainnumber: { type: GraphQLString },
        traindate: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        try {
          let newTicket = new Ticket({
            code: args.code,
            trainnumber: args.trainnumber,
            traindate: args.traindate,
          });
          return await newTicket.save();
        } catch (error) {
          throw new Error("Failed to create ticket: " + error.message);
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
