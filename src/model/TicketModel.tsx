import { TicketEvent } from "./TicketEventModel";

export type TicketStatus = "WAITING" | "CALLED" | "STATUS_GREEN" | "STATUS_YELLOW" | "STATUS_RED";

export type Ticket = {
  id: string;
  user: string;
  status: TicketStatus;
  calledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
  ticketEvent?: TicketEvent;
}