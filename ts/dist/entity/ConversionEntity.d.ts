import { UnixConverterEntityBase } from '../UnixConverterEntityBase';
import type { UnixConverterSDK } from '../UnixConverterSDK';
import type { Control } from '../types';
import type { Conversion, ConversionLoadMatch } from '../UnixConverterTypes';
declare class ConversionEntity extends UnixConverterEntityBase<Conversion> {
    constructor(client: UnixConverterSDK, entopts: any);
    make(this: ConversionEntity): ConversionEntity;
    load(this: any, reqmatch?: ConversionLoadMatch, ctrl?: Control): Promise<ConversionEntity>;
}
export { ConversionEntity };
