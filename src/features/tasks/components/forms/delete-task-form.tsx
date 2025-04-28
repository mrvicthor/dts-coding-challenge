import { deleteTask } from "@/features/actions/tasks";
import { DeleteTaskActionResponse } from "@/lib/definition";
import { Task } from "@/types/task";
import React, { useActionState } from "react";

const initialState: DeleteTaskActionResponse = {
  success: false,
  message: "",
};

type DeleteTaskProps = {
  selectedTask: Task | null;
  handleModal: () => void;
};
const DeleteTaskform = ({ selectedTask, handleModal }: DeleteTaskProps) => {
  const [state, action, pending] = useActionState(deleteTask, initialState);
  return (
    <>
      {state?.success ? (
        <p className="text-green-500">{state?.message}</p>
      ) : (
        <>
          <p className="mt-5 text-sm text-[#696868]">
            Are you sure you want to delete this task? This action cannot be
            reversed, and all the data lost forever.
          </p>
          <form action={action} className="mt-4 space-y-4">
            <input type="hidden" name="id" defaultValue={selectedTask?.id} />
            <button
              disabled={pending}
              type="submit"
              className=" text-white bg-[#C94736] h-[3.3125rem] w-full rounded-lg capitalize font-bold"
            >
              {pending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚪</span>
                  deleting...
                </span>
              ) : (
                "yes, confirm deletion"
              )}
            </button>
          </form>

          <button
            onClick={handleModal}
            className=" text-[#696868] mt-3 w-full rounded-lg capitalize"
          >
            no, go back
          </button>
        </>
      )}
    </>
  );
};

export default DeleteTaskform;
