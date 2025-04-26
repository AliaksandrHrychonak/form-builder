import { faker } from '@faker-js/faker';
import { ApiHideProperty, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { DatabaseIdResponseDto } from 'src/common/database/dtos/response/database.id.response.dto';
import { ENUM_TEMPLATE_TOPIC } from '../../constants/template.enum.constant';
import { AwsS3Dto } from '../../../../common/aws/dtos/aws.s3.dto';
import { UserListResponseDto } from '../../../user/dtos/response/user.list.response.dto';

export class TemplateGetResponseDto extends DatabaseIdResponseDto {
    @ApiProperty({
        required: true,
        nullable: false,
        maxLength: 150,
        minLength: 1,
    })
    readonly title: string;

    @ApiProperty({
        required: true,
        nullable: false,
        maxLength: 350,
        minLength: 1,
    })
    readonly description: string;

    @ApiProperty({
        required: false,
        nullable: false,
        example: ENUM_TEMPLATE_TOPIC.APPLICATION,
    })
    readonly topic?: ENUM_TEMPLATE_TOPIC;

    @ApiProperty({
        required: true,
        nullable: false,
        example: false,
    })
    readonly isPublic: boolean;

    @ApiProperty({
        nullable: true,
        required: false,
        type: () => AwsS3Dto,
        oneOf: [{ $ref: getSchemaPath(AwsS3Dto) }],
    })
    @Type(() => AwsS3Dto)
    readonly image?: AwsS3Dto;

    @ApiProperty({
        description: 'Date created at',
        example: faker.date.recent(),
        required: true,
        nullable: false,
    })
    readonly createdAt: Date;

    @ApiProperty({
        description: 'Date updated at',
        example: faker.date.recent(),
        required: true,
        nullable: false,
    })
    readonly updatedAt: Date;

    @ApiProperty({
        required: true,
        nullable: false,
        type: UserListResponseDto,
    })
    @Type(() => UserListResponseDto)
    readonly owner: UserListResponseDto;

    @ApiProperty({
        required: true,
        nullable: false,
        type: [UserListResponseDto],
    })
    @Type(() => UserListResponseDto)
    readonly sharedUsers: UserListResponseDto[];

    readonly tags: string[];

    @ApiHideProperty()
    @Exclude()
    readonly deletedAt?: Date;
}
