"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderTab } from "./order-tab";
import { QuestionsTab } from "./questions-tab";

export function FormTabs() {
  return (
    <div className="bg-white rounded-lg max-w-[1000px]">
      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="questions">Questões</TabsTrigger>
          <TabsTrigger value="order">Ordem</TabsTrigger>
        </TabsList>

        <TabsContent value="questions">
          <QuestionsTab />
        </TabsContent>

        <TabsContent value="order">
          <OrderTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
