export type CallStatus = "NOT_STARTED" | "CALLING" | "FINISHED"

export type TicketEventForm = {
  title: string;
  numTickets: string;
  detail: string;
}

export type TicketEvent = {
  id?: string;
  title: string;
  numTickets: number;
  detail: string;
  callStatus: CallStatus;
  nextTicketNum: number;
  nextCallNum: number;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}