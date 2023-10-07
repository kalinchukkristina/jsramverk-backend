const Ticket = require("./ticketSchema.js");

const tickets = {
  // getTickets: async function getTickets(req, res) {
  //     try {
  //         const allTickets = await Ticket.find().sort({ _id: -1 });
  //         return res.json({
  //             data: allTickets,
  //         });
  //     } catch (error) {
  //         return res.status(500).json({
  //             error: 'Internal Server Error',
  //         });
  //     }
  // },

  // createTicket: async function createTicket(req, res) {
  //     try {
  //         const { code, trainnumber, traindate } = req.body;
  //         const newTicket = new Ticket({ code, trainnumber, traindate });
  //         await newTicket.save();
  //         return res.status(201).json({
  //             data: {
  //                 id: newTicket._id,
  //                 code,
  //                 trainnumber,
  //                 traindate,
  //             },
  //         });
  //     } catch (error) {
  //         return res.status(500).json({
  //             error: 'Internal Server Error',
  //         });
  //     }
  // },

  deleteTicket: async function deleteTicket(req, res) {
    try {
      const { ticketId } = req.params;

      const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

      if (!deletedTicket) {
        return res.status(404).json({
          error: "Ticket not found",
        });
      }

      return res.status(200).json({
        message: "Ticket deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  },
};

module.exports = tickets;
