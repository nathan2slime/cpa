import { Module } from "@nestjs/common";
import { DashboardTesteController } from "~/app/dashboard-teste/dashboard-teste.controller";
import { DashboardTesteService } from "~/app/dashboard-teste/dashboard-teste.service";
import { PrismaService } from "~/database/prisma.service";

@Module({
  imports: [],
  controllers: [DashboardTesteController],
  providers: [DashboardTesteService, PrismaService],
})
export class DashboardTesteModule {}
