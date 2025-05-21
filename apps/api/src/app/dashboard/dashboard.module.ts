import { Module } from "@nestjs/common";
import { DashboardController } from "~/app/dashboard/dashboard.controller";
import { DashboardService } from "~/app/dashboard/dashboard.service";
import { PrismaService } from "~/database/prisma.service";

@Module({
  imports: [],
  controllers: [DashboardController],
  providers: [DashboardService, PrismaService],
})
export class DashboardModule {}
