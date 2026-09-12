export interface Conversion {
    input?: Record<string, any>;
    output?: Record<string, any>;
    success?: boolean;
}
export interface ConversionLoadMatch {
    date?: string;
    format?: string;
    timestamp?: number;
    timezone?: string;
}
