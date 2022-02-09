import mongoose, { Types } from 'mongoose';
// attributes needed to create User
interface ITicket {
  title: string;
  price: number;
  userId: string;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(props: ITicket): TicketDoc;
}

//User Document
interface TicketDoc extends mongoose.Document {
  title: string;
  price: string;
  userId: string;
}
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.statics.build = (props: ITicket) => {
  return new Ticket(props);
};
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
