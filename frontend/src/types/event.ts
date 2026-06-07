export type EventSeverity = "info" | "success" | "warning" | "error";

export type Event = {
  id: string;
  message: string;
  severity: EventSeverity;
  occurred_at: string;
};
