const Ticket = require("./../models/ticketSchema");
const User = require("./../models/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const typeDefs = `#graphql
  type Query {
    tickets: [Ticket]
    codes: [Code]
    delayed: [Train]
    users: [User]
  }

  type Ticket {
    _id: String,
    code: String,
    trainnumber: String,
    traindate: String,
  }

  type User {
    _id: String,
    username: String,
    password: String,
    tickets: [Ticket]
}

  type LoggedInUser {
    username: String,
    token: String,
    message: String,
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

  input UserInput {
    username: String,
    password: String
  }

  input LoginInput {
    username: String,
    password: String
  }

  type Mutation {
    createUser(userInput: UserInput): User,
    loginUser(loginInput: LoginInput): LoggedInUser,
    createTicket(ticketInput: TicketInput, userId: String!): Ticket
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
    users: async () => {
      try {
        const users = await User.find().sort({ _id: -1 });
        return users;
      } catch (error) {
        throw new Error("Failed to fetch users: " + error.message);
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
    createTicket: async (_, { ticketInput: { code, trainnumber, traindate }, userId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const ticket = {
          code,
          trainnumber,
          traindate
        };

        user.tickets.push(ticket);
        await user.save();

        return ticket;
      } catch (error) {
        throw new Error("Failed to create ticket: " + error.message);
      }
    },
    createUser: async (_, { userInput: { username, password} }) => {
      try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let newUser = new User({
          username: username,
          password: hashedPassword,
        });
        return await newUser.save();
      } catch (error) {
        throw new Error("Failed to create user: " + error.message);
      }
    },
    loginUser: async (_, { loginInput: { username, password } }) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }

        const token = jwt.sign(
          { userId: user._id, username: user.username },
          'a3f9b8d7c6e5f4a3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9',
          { expiresIn: '1h' }
        );

        return {
          message: "Login successful",
          username: user.username,
          token: token,
        };

      } catch (error) {
        throw new Error("Login failed: " + error.message);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
