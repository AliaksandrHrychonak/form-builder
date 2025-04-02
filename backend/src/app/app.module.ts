import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';

@Module({
  controllers: [],
  providers: [],
  imports: [CommonModule],
})
export class AppModule {}
