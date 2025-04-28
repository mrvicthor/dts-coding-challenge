"use server";

import { db } from "@/db";
import { tasks } from "@/db/schema";
import {
  AddTaskActionResponse,
  AddTaskFormData,
  addTaskFormSchema,
  DeleteTaskActionResponse,
  DeleteTaskFormData,
  deleteTaskFormSchema,
  UpdateTaskActionResponse,
  UpdateTaskFormData,
  updateTaskFormSchema,
} from "@/lib/definition";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function createTask(
  state: AddTaskActionResponse | null,
  formData: FormData
) {
  const rawData: AddTaskFormData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    status:
      formData.get("status") === "true" ? true : (false as unknown as boolean),
    dueDate: formData.get("dueDate") as unknown as Date,
  };

  const validateFields = addTaskFormSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Please fill all form fields",
      inputs: rawData,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { title, dueDate, description, status } = validateFields.data;

  await db.insert(tasks).values({
    title,
    dueDate: new Date(dueDate),
    description,
    status,
  });
  revalidatePath("/");
  return {
    success: true,
    message: "Task added successfully",
  };
}

export async function getTasks() {
  const data = await db.query.tasks.findMany({
    columns: {
      id: true,
      title: true,
      description: true,
      status: true,
      dueDate: true,
    },
  });
  return data;
}

export async function updateStatus(id: number) {
  const existingTask = await db.query.tasks.findFirst({
    where: eq(tasks.id, id),
  });
  console.log(existingTask);
  await db
    .update(tasks)
    .set({ status: !existingTask?.status })
    .where(eq(tasks.id, id));
  revalidatePath("/");
  return {
    success: true,
    message: "Status successfully updated",
  };
}

export async function updateTask(
  state: UpdateTaskActionResponse | null,
  formData: FormData
) {
  const rawData: UpdateTaskFormData = {
    id: Number(formData.get("id")),
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    status:
      formData.get("status") === "true" ? true : (false as unknown as boolean),
    dueDate: formData.get("dueDate") as unknown as Date,
  };

  const validateFields = updateTaskFormSchema.safeParse(rawData);

  if (!validateFields.success) {
    return {
      success: false,
      message: "Please fill all form fields",
      inputs: rawData,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { id, status, title, description, dueDate } = validateFields.data;

  await db
    .update(tasks)
    .set({ status, title, description, dueDate: new Date(dueDate) })
    .where(eq(tasks.id, id));

  revalidatePath("/");
  return {
    success: true,
    message: "Task Edited successfully",
  };
}

export async function deleteTask(
  state: DeleteTaskActionResponse | null,
  formData: FormData
) {
  const rawData: DeleteTaskFormData = {
    id: Number(formData.get("id")) as number,
  };

  const validateFields = deleteTaskFormSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Please fill all form fields",
      inputs: rawData,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { id } = validateFields.data;
  await db.delete(tasks).where(eq(tasks.id, id));
  revalidatePath("/pots");
  return {
    success: true,
    message: "Pot deleted successfully",
  };
}
