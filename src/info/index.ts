export interface ScheduleEvent {
  id: string;
  title?: string;
  day: string;
  slot: string;
  teacher:string;
  room:string;
  type:string;
  subject:string;
  comment:string;
}

export type Role = "admin" | "user";

export interface CurrentUser {
  name: string;
  role: Role;
}