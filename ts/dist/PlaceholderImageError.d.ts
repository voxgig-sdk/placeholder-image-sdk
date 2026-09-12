import { Context } from './Context';
declare class PlaceholderImageError extends Error {
    isPlaceholderImageError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { PlaceholderImageError };
