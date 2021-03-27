export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
}

export interface ILogger {
    debug(...data: any[]): never;

    info(...data: any[]): never;

    warning(...data: any[]): never;

    error(...data: any[]): never;
}

export interface IFormatter {
    format(logLevel: LogLevel, ...data: any[]): any[];
}

export class Logger {
    private readonly inner: ILogger;
    private readonly formatter: IFormatter;
    private readonly logLevels: Set<LogLevel>;

    constructor(inner: ILogger, formatter: IFormatter) {
        this.inner = inner;
        this.formatter = formatter;
        this.logLevels = new Set<LogLevel>([
            LogLevel.INFO,
            LogLevel.ERROR
        ]);
    }

    debug(...args: any[]) {
        const logLevel = LogLevel.DEBUG;
        if (!this.logLevels.has(logLevel)) return;
        const fmt = this.formatter.format(logLevel, args);
        this.inner.debug(...fmt);
    }

    info(...args: any[]) {
        const logLevel = LogLevel.INFO;
        if (!this.logLevels.has(logLevel)) return;
        const fmt = this.formatter.format(logLevel, args);
        this.inner.info(...fmt);
    }

    warning(...args: any[]) {
        const logLevel = LogLevel.WARNING;
        if (!this.logLevels.has(logLevel)) return;
        const fmt = this.formatter.format(logLevel, args);
        this.inner.warning(...fmt);
    }

    error(...args: any[]) {
        const logLevel = LogLevel.ERROR;
        if (!this.logLevels.has(logLevel)) return;
        const fmt = this.formatter.format(logLevel, args);
        this.inner.error(...fmt);
    }
}