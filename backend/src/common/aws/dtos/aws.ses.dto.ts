import { ApiProperty } from '@nestjs/swagger';
import {
    ArrayNotEmpty,
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsNotEmptyObject,
    IsObject,
    IsOptional,
    IsString,
} from 'class-validator';

export class AwsSESContentDto {
    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    subject: string;

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    @IsString()
    htmlBody?: string;

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    @IsString()
    textBody?: string;
}

export class AwsSESSendDto<T> {
    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    templateName: string;

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    @IsObject()
    @IsNotEmptyObject()
    templateData?: T;

    @ApiProperty({
        required: true,
    })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    sender: string;

    @ApiProperty({
        required: false,
    })
    @IsEmail()
    @IsString()
    @IsOptional()
    replyTo?: string;

    @ApiProperty({
        required: true,
        isArray: true,
    })
    @IsNotEmpty()
    @IsEmail(null, { each: true })
    @IsArray()
    @ArrayNotEmpty()
    recipients: string[];

    @ApiProperty({
        required: true,
        isArray: true,
    })
    @IsOptional()
    @IsEmail(null, { each: true })
    @IsArray()
    cc?: string[];

    @ApiProperty({
        required: true,
        isArray: true,
    })
    @IsOptional()
    @IsEmail(null, { each: true })
    @IsArray()
    bcc?: string[];

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsObject()
    @IsNotEmptyObject()
    content: AwsSESContentDto;
}
