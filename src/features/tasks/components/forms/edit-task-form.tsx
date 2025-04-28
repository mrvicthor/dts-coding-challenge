import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { updateTask } from "@/features/actions/tasks";
import { UpdateTaskActionResponse } from "@/lib/definition";
import { cn } from "@/lib/utils";
import { Task } from "@/types/task";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useActionState, useState } from "react";

const initialState: UpdateTaskActionResponse = {
  success: false,
  message: "",
};

type EditTaskProps = {
  selectedTask: Task | null;
};

const EditTaskForm = ({ selectedTask }: EditTaskProps) => {
  const [state, action, pending] = useActionState(updateTask, initialState);
  const [date, setDate] = useState<Date | undefined>(selectedTask?.dueDate);

  return (
    <>
      {state?.success === true ? (
        <p className="text-green-500">{state?.message}</p>
      ) : (
        <form action={action} className="space-y-5">
          <input type="hidden" name="id" defaultValue={selectedTask?.id} />
          <div className="space-y-1">
            <Label htmlFor="title" className="opacity-50">
              Title
            </Label>
            <Input
              name="title"
              placeholder="learn new skills..."
              defaultValue={selectedTask?.title}
            />
          </div>
          {state?.errors?.title && (
            <p className="text-red-500">{state.errors.title}</p>
          )}
          <div className="space-y-1">
            <Label htmlFor="description" className="opacity-50">
              Description
            </Label>
            <Textarea
              name="description"
              defaultValue={String(selectedTask?.description)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="dueDate" className="opacity-50">
              Due Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left h-[45px] border-[#98908B] font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Due Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {state?.errors?.dueDate && (
              <p className="text-red-500">{state.errors.dueDate}</p>
            )}
            <input type="hidden" name="dueDate" value={date?.toISOString()} />
          </div>
          <button
            disabled={pending}
            type="submit"
            className="mt-8 text-white bg-[#201F24] h-[3.3125rem] w-full rounded-lg capitalize font-bold"
          >
            {pending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⚪</span>
                updating...
              </span>
            ) : (
              "save task"
            )}
          </button>
        </form>
      )}
    </>
  );
};

export default EditTaskForm;
