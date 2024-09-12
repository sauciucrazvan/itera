import { Severity } from "./Severities";
import { Status } from "./Statuses";

export interface IssueThread {
  id: string;
  title: string;
  status: Status;
  severity: Severity;
  author: Author;
}

export interface Author {
  id: string;
  name: string;
}
