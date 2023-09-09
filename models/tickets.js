const Ticket = require('./ticketSchema.js');

const tickets = {
    getTickets: async function getTickets(req, res) {
        try {
            const allTickets = await Ticket.find().sort({ _id: -1 });
            return res.json({
                data: allTickets,
            });
        } catch (error) {
            console.error('Error getting tickets:', error);
            return res.status(500).json({
                error: 'Internal Server Error',
            });
        }
    },

    createTicket: async function createTicket(req, res) {
        try {
            const { code, trainnumber, traindate } = req.body;
            const newTicket = new Ticket({ code, trainnumber, traindate });
            await newTicket.save();
            return res.json({
                data: {
                    id: newTicket._id,
                    code,
                    trainnumber,
                    traindate,
                },
            });
        } catch (error) {
            console.error('Error creating ticket:', error);
            return res.status(500).json({
                error: 'Internal Server Error',
            });
        }
    },
};

module.exports = tickets;
