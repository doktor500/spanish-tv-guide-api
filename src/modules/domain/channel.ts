import { Program } from "./schedule";

export type Channel = {
  url: string;
  icon: string;
  name: string;
  schedule: Program[];
};