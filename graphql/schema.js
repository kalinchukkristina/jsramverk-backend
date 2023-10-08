const Ticket = require("./../models/ticketSchema");

const typeDefs = `#graphql
  type Query {
    tickets: [Ticket]
    codes: [Code]
    delayed: [Train]
  }

  type Ticket {
    _id: String,
    code: String,
    trainnumber: String,
    traindate: String,
  }

  type Code {
    Code: String,
    Level1Description: String,
    Level2Description: String,
    Level3Description: String,
  }

  type Train {
    ActivityId: String,
    ActivityType: String,
    AdvertisedTimeAtLocation: String,
    AdvertisedTrainIdent: String,
    Canceled: Boolean,
    EstimatedTimeAtLocation: String,
    FromLocation: [Location],
    LocationSignature: String,
    OperationalTrainNumber: String,
    ToLocation: [Location],
    TrainOwner: String
  }

  type Location {
    LocationName: String,
    Priority: Int,
    Order: Int
  }

  input TicketInput {
    code: String,
    trainnumber: String,
    traindate: String,
  }
  type Mutation {
    addTicket(ticketInput: TicketInput): Ticket
  }
`;

const resolvers = {
  Query: {
    tickets: async () => {
      try {
        const tickets = await Ticket.find().sort({ _id: -1 });
        return tickets;
      } catch (error) {
        throw new Error("Failed to fetch tickets: " + error.message);
      }
    },
    codes: async () => {
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
    delayed: async () => {
      const query = `<REQUEST>
            <LOGIN authenticationkey="${process.env.TRAFIKVERKET_API_KEY}" />
            <QUERY objecttype="TrainAnnouncement" orderby='AdvertisedTimeAtLocation' schemaversion="1.8">
                  <FILTER>
                  <AND>
                      <EQ name="ActivityType" value="Avgang" />
                      <GT name="EstimatedTimeAtLocation" value="$now" />
                      <AND>
                          <GT name='AdvertisedTimeAtLocation' value='$dateadd(-00:15:00)' />
                          <LT name='AdvertisedTimeAtLocation'                   value='$dateadd(02:00:00)' />
                      </AND>
                  </AND>
                  </FILTER>
                  <INCLUDE>ActivityId</INCLUDE>
                  <INCLUDE>ActivityType</INCLUDE>
                  <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
                  <INCLUDE>EstimatedTimeAtLocation</INCLUDE>
                  <INCLUDE>AdvertisedTrainIdent</INCLUDE>
                  <INCLUDE>OperationalTrainNumber</INCLUDE>
                  <INCLUDE>Canceled</INCLUDE>
                  <INCLUDE>FromLocation</INCLUDE>
                  <INCLUDE>ToLocation</INCLUDE>
                  <INCLUDE>LocationSignature</INCLUDE>
                  <INCLUDE>TimeAtLocation</INCLUDE>
                  <INCLUDE>TrainOwner</INCLUDE>
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
      return result.RESPONSE.RESULT[0].TrainAnnouncement || [];
    },
  },
  Mutation: {
    addTicket: async (_, { ticketInput: { code, trainnumber, traindate } }) => {
      try {
        let newTicket = new Ticket({
          code: code,
          trainnumber: trainnumber,
          traindate: traindate,
        });
        return await newTicket.save();
      } catch (error) {
        throw new Error("Failed to create ticket: " + error.message);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
