import { PlaceholderImageEntityBase } from '../PlaceholderImageEntityBase';
import type { PlaceholderImageSDK } from '../PlaceholderImageSDK';
import type { Control } from '../types';
import type { Placeholder, PlaceholderLoadMatch } from '../PlaceholderImageTypes';
declare class PlaceholderEntity extends PlaceholderImageEntityBase<Placeholder> {
    constructor(client: PlaceholderImageSDK, entopts: any);
    make(this: PlaceholderEntity): PlaceholderEntity;
    load(this: any, reqmatch?: PlaceholderLoadMatch, ctrl?: Control): Promise<PlaceholderEntity>;
}
export { PlaceholderEntity };
