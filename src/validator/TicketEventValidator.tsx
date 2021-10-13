import { EditorState } from "draft-js"
import { User } from "firebase/auth"

import { TicketEventForm } from "../model/TicketEventModel"
import { commonInputString, formatSettings } from "../settings/BusinessSettings"
import {
  acceptTermsOfUseRequired, loginRequired, inputRequired, lengthExceeded,
  integerRequired, minimumRequired, maxExceeded
} from "../settings/FeedbackMessages"

export const validateTicketEvent = (user: User | null | undefined, values: TicketEventForm, detailEditorState: EditorState, acceptChecked: boolean): { [key in (keyof TicketEventForm | keyof typeof commonInputString)]?: string } => {
  const error: { [key in (keyof TicketEventForm | keyof typeof commonInputString)]?: string } = {}
  error.login = validateLogin(user)
  error.title = validateTitle(values.title)
  error.numTickets = validateNumTickets(values.numTickets)
  error.detail = validateDetail(detailEditorState)
  error.accept = validateAccept(acceptChecked)

  return error
}

const validateLogin = (user: User | null | undefined): string | undefined => {
  if (!user) {
    return loginRequired
  }
  return undefined
}

const validateTitle = (title: string): string | undefined => {
  if (title.length < 1) {
    return inputRequired
  }

  if (title.length > formatSettings.ticketEvent.title.max) {
    return lengthExceeded(formatSettings.ticketEvent.title.max)
  }

  return undefined
}

const validateNumTickets = (numTickets: string): string | undefined => {
  if (!Number.isInteger(Number(numTickets))) {
    return integerRequired
  }

  if (Number(numTickets) < formatSettings.ticketEvent.numTickets.min) {
    return minimumRequired(formatSettings.ticketEvent.numTickets.min)
  }

  if (Number(numTickets) > formatSettings.ticketEvent.numTickets.max) {
    return maxExceeded(formatSettings.ticketEvent.numTickets.max)
  }

  return undefined
}

const validateDetail = (detailEditorState: EditorState): string | undefined => {
  const length = detailEditorState.getCurrentContent().getPlainText('').length

  if (length > formatSettings.ticketEvent.detail.maxPlain) {
    return lengthExceeded(formatSettings.ticketEvent.detail.maxPlain)
  }
  return undefined
}

const validateAccept = (acceptChecked: boolean): string | undefined => {
  if (!acceptChecked) {
    return acceptTermsOfUseRequired
  }

  return undefined
}
