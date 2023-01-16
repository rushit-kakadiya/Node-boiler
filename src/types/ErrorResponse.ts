import MessageResponse from './ResponseWithMessage';

export default interface ErrorResponse extends MessageResponse {
  stack?: string;
}
