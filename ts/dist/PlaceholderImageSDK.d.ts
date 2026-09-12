import { PlaceholderEntity } from './entity/PlaceholderEntity';
import { PlaceholderImageEntity } from './entity/PlaceholderImageEntity';
export type * from './PlaceholderImageTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { PlaceholderImageEntityBase } from './PlaceholderImageEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class PlaceholderImageSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Placeholder(entopts?: Record<string, any>): PlaceholderEntity;
    PlaceholderImage(entopts?: Record<string, any>): PlaceholderImageEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): PlaceholderImageSDK;
    tester(testopts?: any, sdkopts?: any): PlaceholderImageSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof PlaceholderImageSDK;
export { stdutil, config, BaseFeature, PlaceholderImageEntityBase, PlaceholderImageSDK, SDK, };
