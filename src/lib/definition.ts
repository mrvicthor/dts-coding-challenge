import { z } from "zod";

export const addTaskFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long. " })
    .trim(),
  description: z.string().optional(),
  status: z.boolean().default(false).optional(),
  dueDate: z.string().datetime({ message: "Date is invalid" }),
});

export type AddTaskFormData = {
  title: string;
  description: string;
  status: boolean;
  dueDate: Date;
};

export type ActionResponse<T> = {
  success: boolean;
  message: string;
  inputs?: T;
  errors?: { [K in keyof T]?: string[] };
};

export type AddTaskActionResponse = ActionResponse<AddTaskFormData>;

export const updateStatusFormSchema = z.object({
  id: z.number(),
  status: z.boolean(),
});

export type UpdateStatusFormData = {
  id: number;
  status: boolean;
};

export type UpdateStatusActionResponse = ActionResponse<UpdateStatusFormData>;

export const updateTaskFormSchema = addTaskFormSchema.extend({
  id: z.number(),
});

export type UpdateTaskFormData = AddTaskFormData & {
  id: number;
};

export type UpdateTaskActionResponse = ActionResponse<UpdateTaskFormData>;

export const deleteTaskFormSchema = z.object({
  id: z.number(),
});

export type DeleteTaskFormData = {
  id: number;
};

export type DeleteTaskActionResponse = ActionResponse<DeleteTaskFormData>;
