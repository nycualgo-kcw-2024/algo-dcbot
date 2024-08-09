import {appendFileSync} from 'fs';
import moment from 'moment-timezone';

import {config} from './config';

enum LogLevel{
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  DEBUG = 'DEBUG',
  LOG = 'LOG',
  INFO = 'INFO',
}

class Logger{
  constructor(readonly logFile?: string){
    this.debug('logger initialized');
  }
  private currentTime(): string{
    return '[' + moment().tz('Asia/Taipei').format('YYYY/MM/DD hh:mm:ss') + ']';
  }
  private writeLog(content: string, logLevel: LogLevel): void{
    const line = `${this.currentTime()} ${logLevel}: ${content}`;
    console.log(line);
    if(this.logFile !== undefined){
      appendFileSync(this.logFile, line + '\n');
    }
  }
  error(content: string): Error{
    this.writeLog(content, LogLevel.ERROR); return Error(content);
  }
  warning(content: string): string{
    this.writeLog(content, LogLevel.WARNING); return content;
  }
  debug(content: string): string{
    this.writeLog(content, LogLevel.DEBUG); return content;
  }
  log(content: string): string{
    this.writeLog(content, LogLevel.LOG); return content;
  }
  info(content: string): string{
    this.writeLog(content, LogLevel.INFO); return content;
  }
}

export const logger = new Logger(`./${config.logger.logFile}`);
