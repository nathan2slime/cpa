"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UsersCsvUpload from "@/components/users-csv-upload";
import {
  createCourseService,
  getAllCoursesService,
  updateCourseService,
  removeCourseService,
  Course,
  CreateCoursePayload,
  UpdateCoursePayload,
} from "@/services/course.service";
import { CourseType } from "@/types/courseType";
import { toast } from "react-hot-toast";

const RecipientsTabContent = () => {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseName, setCourseName] = useState("");
  const [courseType, setCourseType] = useState<CourseType>(CourseType.TECH);

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getAllCoursesService,
  });

  const createCourseMutation = useMutation({
    mutationFn: (newCourse: CreateCoursePayload) =>
      createCourseService(newCourse),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Destinatário criado com sucesso!");
      setIsCreateModalOpen(false);
      setCourseName("");
      setCourseType(CourseType.TECH);
    },
    onError: (err: any) => {
      toast.error(`Erro ao criar destinatário: ${err.message}`);
    },
  });

  const updateCourseMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateCoursePayload;
    }) => updateCourseService(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Destinatário atualizado com sucesso!");
      setIsEditModalOpen(false);
      setSelectedCourse(null);
      setCourseName("");
      setCourseType(CourseType.TECH);
    },
    onError: (err: any) => {
      toast.error(`Erro ao atualizar destinatário: ${err.message}`);
    },
  });

  const deleteCourseMutation = useMutation({
    mutationFn: (id: string) => removeCourseService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Destinatário excluído com sucesso!");
      setIsDeleteModalOpen(false);
      setSelectedCourse(null);
    },
    onError: (err: any) => {
      toast.error(`Erro ao excluir destinatário: ${err.message}`);
    },
  });

  const handleCreateCourse = () => {
    createCourseMutation.mutate({ name: courseName, type: courseType });
  };

  const handleUpdateCourse = () => {
    if (selectedCourse) {
      updateCourseMutation.mutate({
        id: selectedCourse.id,
        payload: { name: courseName, type: courseType },
      });
    }
  };

  const handleDeleteCourse = () => {
    if (selectedCourse) {
      deleteCourseMutation.mutate(selectedCourse.id);
    }
  };

  const openEditModal = (course: Course) => {
    setSelectedCourse(course);
    setCourseName(course.name);
    setCourseType(course.type);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteModalOpen(true);
  };

  if (isLoading) return <div>Carregando destinatários...</div>;
  if (error) return <div>Erro ao carregar destinatários: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setIsCreateModalOpen(true)} className="w-fit">
        Criar Novo Destinatário
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Destinatários</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses?.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>{course.type}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => openEditModal(course)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteModal(course)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Destinatário</DialogTitle>
            <DialogDescription>
              Preencha os dados para criar um novo destinatário.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select
                value={courseType}
                onValueChange={(value: CourseType) => setCourseType(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(CourseType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateCourse}>Criar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Destinatário</DialogTitle>
            <DialogDescription>
              Edite os dados do destinatário selecionado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Nome
              </Label>
              <Input
                id="edit-name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-type" className="text-right">
                Tipo
              </Label>
              <Select
                value={courseType}
                onValueChange={(value: CourseType) => setCourseType(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(CourseType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdateCourse}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o destinatário "
              {selectedCourse?.name}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteCourse}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const CoursesPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <Tabs defaultValue="recipients" className="w-full">
        <TabsList>
          <TabsTrigger value="recipients">Destinatários</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
        </TabsList>
        <TabsContent value="recipients">
          <RecipientsTabContent />
        </TabsContent>
        <TabsContent value="users">
          <UsersCsvUpload />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursesPage;
