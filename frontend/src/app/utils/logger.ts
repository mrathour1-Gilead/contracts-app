/**
 * Centralized logging utility
 * Provides consistent logging interface with production safeguards
 */

import { ENV } from "../config/env";

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

class Logger {
  private isDevelopment = ENV.IS_DEVELOPMENT;

  /**
   * Log debug messages (development only)
   */
  debug(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console.debug(`[${LogLevel.DEBUG}]`, message, ...args);
    }
  }

  /**
   * Log info messages
   */
  info(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console.info(`[${LogLevel.INFO}]`, message, ...args);
    }
  }

  /**
   * Log warning messages
   */
  warn(message: string, ...args: unknown[]): void {
    console.warn(`[${LogLevel.WARN}]`, message, ...args);
  }

  /**
   * Log error messages and send to error tracking service
   */
  error(message: string, error?: Error, ...args: unknown[]): void {
    console.error(`[${LogLevel.ERROR}]`, message, error, ...args);

    // In production, send to error tracking service
    if (ENV.IS_PRODUCTION && ENV.ENABLE_ERROR_REPORTING) {
      this.sendToErrorService(message, error, args);
    }
  }

  /**
   * Send error to external tracking service
   */
  private sendToErrorService(
    message: string,
    error?: Error,
    context?: unknown[]
  ): void {
    // TODO: Implement error tracking service integration
    // Example: Sentry, LogRocket, Rollbar, etc.
    // Sentry.captureException(error, { extra: { message, context } });
  }

  /**
   * Log API calls (development only)
   */
  api(method: string, url: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.log(
        `%c[API] ${method.toUpperCase()} ${url}`,
        "color: #306e9a; font-weight: bold",
        data
      );
    }
  }

  /**
   * Log performance metrics
   */
  performance(label: string, duration: number): void {
    if (this.isDevelopment) {
      console.log(
        `%c[PERFORMANCE] ${label}: ${duration.toFixed(2)}ms`,
        "color: #10b981; font-weight: bold"
      );
    }
  }
}

export const logger = new Logger();
