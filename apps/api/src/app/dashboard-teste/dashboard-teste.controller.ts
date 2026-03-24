import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DashboardTesteService } from "~/app/dashboard-teste/dashboard-teste.service";

@ApiTags("Dashboard Teste")
@Controller("dashboard-teste")
export class DashboardTesteController {
  constructor(
    private readonly dashboardTesteService: DashboardTesteService,
  ) {}

  @Get()
  getSummary() {
    return this.dashboardTesteService.getSummary();
  }

  @Get("open-events")
  getOpenEvents() {
    return this.dashboardTesteService.getOpenEvents();
  }

  @Get("event-stats/:eventId")
  getEventStats(@Param("eventId") eventId: string) {
    return this.dashboardTesteService.getEventStats(eventId);
  }
}
