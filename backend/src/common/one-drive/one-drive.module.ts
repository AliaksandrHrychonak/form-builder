import { Module } from '@nestjs/common';
import { OneDriveService } from './services/one-drive.service';

@Module({
    exports: [OneDriveService],
    providers: [OneDriveService],
    imports: [],
    controllers: [],
})
export class OneDriveModule {}
