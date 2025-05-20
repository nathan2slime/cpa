import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString, Min } from "class-validator";

import { SortOrder } from "~/types/filter.enum";

export class PaginationDto {
  @ApiProperty({ required: false })
  @Transform((params) => {
    if (params.value) {
      if (params.value.trim().length === 0) return undefined;
    }

    return params.value;
  })
  query: string;

  @ApiProperty({ default: 1, required: false })
  @Transform((params) => Number.parseInt(params.value))
  @IsOptional()
  @Min(1)
  page = 1;

  @ApiProperty({ enum: SortOrder, default: SortOrder.DESC, required: false })
  sortOrder: SortOrder;

  @ApiProperty({ required: false })
  @IsOptional()
  sortField: string;

  @ApiProperty({ default: 12, required: false })
  @Transform((params) => Number.parseInt(params.value))
  @IsOptional()
  @Min(1)
  perPage = 12;
}

export class PaginateWithNameTagDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tag: string;
}
