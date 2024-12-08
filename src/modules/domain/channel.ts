import { Program } from "@/modules/domain/schedule";

export type Channel = {
  url: string;
  icon: string;
  name: string;
  schedule: Program[];
};