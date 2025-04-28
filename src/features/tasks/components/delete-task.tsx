import React, { Suspense } from "react";
import Image from "next/image";
import Loading from "@/components/loading";
import closeIcon from "../../../../public/icon-close-modal.svg";
import { Task } from "@/types/task";
import DeleteTaskForm from "./forms/delete-task-form";
type DeleteTaskProps = {
  onClose: () => void;
  selectedTask: Task | null;
};
const DeleteTask = ({ onClose, selectedTask }: DeleteTaskProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-[20.9375rem] sm:max-w-[35rem] py-8 px-5 sm:px-8 z-50">
        <div className="flex items-center justify-between">
          <p className="text-[#201F24] font-bold text-[2rem] capitalize">
            delete task
          </p>
          <Image
            src={closeIcon}
            onClick={onClose}
            alt="close-icon"
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </div>
        <DeleteTaskForm selectedTask={selectedTask} handleModal={onClose} />
      </div>
    </Suspense>
  );
};

export default DeleteTask;
