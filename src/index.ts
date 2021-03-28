export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
}

export interface ILogger {
    debug(...data: any[]): void;

    info(...data: any[]): void;

    warning(...data: any[]): void;

    error(...data: any[]): void;
}

export interface IFormatter {
    format(logLevel: LogLevel, ...data: any[]): unknown[];
}

export class Logger {
    private readonly inner: ILogger;
    private readonly formatter: IFormatter;
    readonly logLevels: Set<LogLevel>;

    constructor(inner: ILogger, formatter: IFormatter) {
        this.inner = inner;
        this.formatter = formatter;
        this.logLevels = new Set<LogLevel>([
            LogLevel.INFO,
            LogLevel.ERROR
        ]);
    }

    enableLogLevel(logLevel: LogLevel): void {
        this.logLevels.add(logLevel);
    }

    enableLogLevels(logLevels: LogLevel[]): void {
        logLevels.forEach((logLevel) => {
            this.logLevels.add(logLevel);
        })
    }

    disableLogLevel(logLevel: LogLevel): void {
        this.logLevels.delete(logLevel);
    }

    disableLogLevels(logLevels: LogLevel[]): void {
        logLevels.forEach((logLevel) => {
            this.logLevels.delete(logLevel);
        })
    }

    debug(...args: any[]): void {
        const logLevel = LogLevel.DEBUG;
        if (!this.logLevels.has(logLevel)) return;
        const fmt = this.formatter.format(logLevel, ...args);
        this.inner.debug(...fmt);
    }

    info(...args: any[]): void {
        const logLevel = LogLevel.INFO;
        if (!this.logLevels.has(logLevel)) return;
        const fmt = this.formatter.format(logLevel, ...args);
        this.inner.info(...fmt);
    }

    warning(...args: any[]): void {
        const logLevel = LogLevel.WARNING;
        if (!this.logLevels.has(logLevel)) return;
        const fmt = this.formatter.format(logLevel, ...args);
        this.inner.warning(...fmt);
    }

    error(...args: any[]): void {
        const logLevel = LogLevel.ERROR;
        if (!this.logLevels.has(logLevel)) return;
        const fmt = this.formatter.format(logLevel, ...args);
        this.inner.error(...fmt);
    }
}