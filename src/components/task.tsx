import { useDeleteTask } from "@/hooks/useTask";
import { cn } from "@/lib/cn";
import { Checkbox } from "@headlessui/react";
import { Check, PencilSimple, Trash } from "phosphor-react";
import toast from "react-hot-toast";

interface TaskProps {
  id: string;
  name: string;
  projectId: string | undefined;
  description?: string;
  completed: boolean;
  onModal: boolean;
  onEdit: () => void;
  onToggleComplete: () => void;
}

export function Task({
  id,
  name,
  projectId,
  description,
  completed,
  onModal,
  onEdit,
  onToggleComplete,
}: TaskProps) {
  const { mutateAsync: deleteTask, isPending } = useDeleteTask();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteTask({ id, projectId });
      toast.success("Tarefa excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir tarefa");
    }
  };

  return (
    <div
      className={cn(
        "flex items-center bg-[#181C23] rounded-xl p-3 mb-2 shadow gap-3",
        onModal ? "bg-[#181C23]" : "bg-base-2 "
      )}
    >
      <Checkbox
        checked={completed}
        onChange={onToggleComplete}
        className="group cursor-pointer flex items-center justify-center mr-2 w-6 h-6 rounded border-2 border-gray-500 bg-base-2 data-checked:border-primary data-checked:bg-primary transition-colors focus:outline-1"
      >
        {completed && <Check size={18} weight="bold" className="text-white" />}
      </Checkbox>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <span
          className={
            completed
              ? "line-through text-gray-500 font-medium text-base ml-1"
              : "text-white font-medium text-base ml-1"
          }
        >
          {name}
        </span>
        {description && (
          <span
            className={
              completed
                ? "line-through text-gray-500 text-xs ml-1"
                : "text-gray-400 text-xs ml-1"
            }
          >
            {description}
          </span>
        )}
      </div>
      <div className="flex gap-1 ml-2 items-center">
        <button
          onClick={onEdit}
          className="text-primary focus:outline-1 hover:bg-primary/10 rounded-full p-2 transition-transform hover:scale-110 cursor-pointer"
          title="Editar"
        >
          <PencilSimple size={20} weight="fill" />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 focus:outline-1 hover:bg-red-500/10 rounded-full p-2 transition-transform hover:scale-110 cursor-pointer"
          title="Excluir"
          disabled={isPending}
        >
          <Trash size={20} weight="fill" />
        </button>
      </div>
    </div>
  );
}
