import chalk from "chalk";

export class ConsoleLogger {
  public log(message: string) {
    console.log(message);
  }

  public info(message: string) {
    console.log(chalk.green(message));
  }

  public error(message: string) {
    console.log(chalk.red(message));
  }

  public warn(message: string) {
    console.log(chalk.yellow(message));
  }
}

export default new ConsoleLogger();
