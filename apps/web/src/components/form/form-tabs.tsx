"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderTab } from "./order-tab";
import { PreviewTab } from "./preview-tab";
import { QuestionsTab } from "./questions-tab";

export function FormTabs() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="questions">Questões</TabsTrigger>
          <TabsTrigger value="order">Ordem</TabsTrigger>
          <TabsTrigger value="preview">Pré-visualização</TabsTrigger>
        </TabsList>

        <TabsContent value="questions">
          <QuestionsTab />
        </TabsContent>

        <TabsContent value="order">
          <OrderTab />
        </TabsContent>

        <TabsContent value="preview">
          <PreviewTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
