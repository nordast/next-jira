import { parseAsString, useQueryState } from "nuqs";

export const useEditTaskModal = () => {
  const [taskId, setTaskId] = useQueryState("edit-task", parseAsString);

  return {
    taskId,
    setTaskId,
  };
};
