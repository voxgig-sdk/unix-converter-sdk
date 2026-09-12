import { Context } from './Context';
declare class UnixConverterError extends Error {
    isUnixConverterError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { UnixConverterError };
