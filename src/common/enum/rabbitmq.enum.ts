/**
 * store exchange enum in package util!
 */
export enum ETodoEventTriggered {
  QUEUE = "todo.triggered.q",
  EXCHANGE = "todo.triggered.x",
  TYPE = "direct",
  ROUTING_KEY = "todo.triggered"
}
