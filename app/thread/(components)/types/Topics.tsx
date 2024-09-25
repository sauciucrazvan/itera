import { Category } from "./Categories";
import { Severity } from "./Severities";
import { Status } from "./Statuses";

export interface Thread {
  id: string;
  title: string;
  status: Status;
  category: Category;
  author: {
    id: string;
    name: string;
  };
  severity: Severity;
  properties: {};
}
