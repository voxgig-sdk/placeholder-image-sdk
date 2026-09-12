import { PlaceholderImageEntityBase } from '../PlaceholderImageEntityBase';
import type { PlaceholderImageSDK } from '../PlaceholderImageSDK';
import type { Control } from '../types';
import type { PlaceholderImage, PlaceholderImageLoadMatch } from '../PlaceholderImageTypes';
declare class PlaceholderImageEntity extends PlaceholderImageEntityBase<PlaceholderImage> {
    constructor(client: PlaceholderImageSDK, entopts: any);
    make(this: PlaceholderImageEntity): PlaceholderImageEntity;
    load(this: any, reqmatch?: PlaceholderImageLoadMatch, ctrl?: Control): Promise<PlaceholderImageEntity>;
}
export { PlaceholderImageEntity };
