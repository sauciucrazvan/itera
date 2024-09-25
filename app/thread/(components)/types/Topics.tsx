import { Severity } from "./Severities";
import { Status } from "./Statuses";

export interface Thread {
  id: string;
  title: string;
  status: Status;
  severity: Severity;
  author: {
    id: string;
    name: string;
  };
}
