import { parseAsBoolean, useQueryState } from "nuqs";

export const useCreateTaskModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-task",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  return {
    isOpen,
    setIsOpen,
  };
};
