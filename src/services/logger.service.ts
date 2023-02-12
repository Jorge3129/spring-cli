import * as colors from "colors";

export class ConsoleLogger {
  public log(message: string) {
    console.log(message);
  }

  public info(message: string) {
    console.log(message.green);
  }

  public error(message: string) {
    console.log(message.red);
  }

  public warn(message: string) {
    console.log(message.yellow);
  }
}

export default new ConsoleLogger();
