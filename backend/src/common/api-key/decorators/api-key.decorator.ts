import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { API_KEY_X_TYPE_META_KEY } from 'src/common/api-key/constants/api-key.constant';
import { ENUM_API_KEY_TYPE } from 'src/common/api-key/constants/api-key.enum.constant';
import { ApiKeyXApiKeyGuard } from 'src/common/api-key/guards/x-api-key/api-key.x-api-key.guard';
import { ApiKeyXApiKeyTypeGuard } from 'src/common/api-key/guards/x-api-key/api-key.x-api-key.type.guard';

export function ApiKeyPrivateProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(ApiKeyXApiKeyGuard, ApiKeyXApiKeyTypeGuard),
        SetMetadata(API_KEY_X_TYPE_META_KEY, [ENUM_API_KEY_TYPE.PRIVATE])
    );
}

export function ApiKeyPublicProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(ApiKeyXApiKeyGuard, ApiKeyXApiKeyTypeGuard),
        SetMetadata(API_KEY_X_TYPE_META_KEY, [ENUM_API_KEY_TYPE.PUBLIC])
    );
}
