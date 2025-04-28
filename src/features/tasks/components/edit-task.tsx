import React, { Suspense } from "react";
import Image from "next/image";
import Loading from "@/components/loading";
import closeIcon from "../../../../public/icon-close-modal.svg";
import EditTaskForm from "./forms/edit-task-form";
import { Task } from "@/types/task";

type EditTaskProps = {
  onClose: () => void;
  selectedTask: Task | null;
};

const EditTask = ({ onClose, selectedTask }: EditTaskProps) => {
  console.log(selectedTask);
  return (
    <Suspense fallback={<Loading />}>
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-[20.9375rem] sm:max-w-[35rem] py-8 px-5 sm:px-8 z-50">
        <div className="flex items-center justify-between">
          <p className="text-[#201F24] font-bold text-[2rem] capitalize">
            edit pot
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
        <EditTaskForm selectedTask={selectedTask} />
      </div>
    </Suspense>
  );
};

export default EditTask;
