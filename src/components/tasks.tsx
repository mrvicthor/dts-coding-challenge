"use client";
import React, { useState, useEffect, startTransition } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import CreateTask from "@/features/tasks/components/create-task";
import { Task } from "@/types/task";
import { getTasks, updateStatus } from "@/features/actions/tasks";
import { motion } from "motion/react";
import { containerVariants, itemVariants } from "@/helpers/motion";
import { Checkbox } from "./ui/checkbox";
import EditTask from "@/features/tasks/components/edit-task";
import DeleteTask from "@/features/tasks/components/delete-task";

const Tasks = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [data, setData] = useState<Task[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const fetchData = async () => {
    const response = await getTasks();
    setData(response);
  };

  const updateTaskStatus = async (id: number) => {
    await updateStatus(id);
    startTransition(() => {
      fetchData();
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" flex flex-col space-y-4">
      <h1 className="capitalize font-bold text-4xl">tasks</h1>

      <Button
        className="cursor-pointer capitalize"
        onClick={() => setShowCreateForm(true)}
      >
        add task
      </Button>
      {showCreateForm &&
        createPortal(
          <CreateTask onClose={() => setShowCreateForm(false)} />,
          document.body
        )}
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-[0.96875rem] space-y-2 relative"
      >
        {data.map((task) => (
          <motion.li
            variants={itemVariants}
            key={task.id}
            onClick={() => {
              setSelected(task.title);
              setShowOptions(!showOptions);
            }}
            className="flex justify-between gap-4 px-4 py-2 cursor-pointer bg-white rounded-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col space-x-2">
              <Checkbox
                checked={Boolean(task.status)}
                onCheckedChange={() => updateTaskStatus(Number(task.id))}
              />
            </div>

            {task.title}
            {showOptions && selected === task.title && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-80 z-40"
                  onClick={() => setShowOptions(false)}
                />
                <div className="absolute top-0 right-0 flex flex-col divide-y-[1px] items-center justify-center z-40 px-5 py-3 h-[5.6875rem] w-[8.375rem] bg-white modal-box-shadow rounded-lg">
                  <button
                    className="text-sm text-[#201F24] pb-3 capitalize"
                    onClick={() => {
                      setShowOptions(false);
                      setEditTask(true);
                      setSelectedTask(task);
                    }}
                  >
                    edit task
                  </button>
                  <button
                    className="text-sm text-[#C94736] capitalize pt-3"
                    onClick={() => {
                      setShowOptions(false);
                      setDeleteTask(true);
                      setSelectedTask(task);
                    }}
                  >
                    delete task
                  </button>
                </div>
              </>
            )}
          </motion.li>
        ))}
      </motion.ul>

      {editTask &&
        createPortal(
          <EditTask
            onClose={() => {
              setSelected("");
              setSelectedTask(null);
              setEditTask(false);
            }}
            selectedTask={selectedTask}
          />,

          document.body
        )}
      {deleteTask &&
        createPortal(
          <DeleteTask
            onClose={() => {
              setSelected("");
              setSelectedTask(null);
              setDeleteTask(false);
            }}
            selectedTask={selectedTask}
          />,
          document.body
        )}
    </div>
  );
};

export default Tasks;
