export interface HandlerData {
  body: string; // the body of the request
  query: { // the query parameters
    [key: string]: string;
  }
  params: { // the path parameters
    "*": string;
    [key: string]: string;
  }
}
export type Handler = (_id: string, data: HandlerData | string, _pattern: string, _isEmitter: boolean) => string | void;