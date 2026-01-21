import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./utils";
import { toast } from "react-toastify";

export const useFetchTasks = () => {
    const { isPending, data, error, isError } = useQuery({
    queryKey: ['tasks'], // unique key for caching this query
    // queryFn: () => axiosInstance.get('/'),
    queryFn: async () => {
      // axios response data is nested inside the `data` property
      const { data } = await axiosInstance.get('/'); // data = {taskList: Array(4)}
      return data;
    },
  });

  return {isPending, data, error, isError}
}

// const queryClient = useQueryClient(); // GOTCHA: Invalid hook call error, needs to used inside each hook

export const useCreateTask = () => {
    const queryClient = useQueryClient();

  const { mutate: createTask, isPending } = useMutation({
    mutationFn: (taskTitle) => axiosInstance.post('/', { title: taskTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('New task added!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.msg || error.message);
    },
  });

  return {createTask, isPending}
}

export const useUpdateTaskStatus = () => {
    const queryClient = useQueryClient();

    const { isPending, mutate: toggleTaskStatus } = useMutation({
    mutationFn: ({ taskId, taskIsDone }) =>
      axiosInstance.patch(`/${taskId}`, { isDone: !taskIsDone }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data || error.message);
    },
  });

  return {isPending, toggleTaskStatus}
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deleteTask } = useMutation({
        mutationFn: (taskId) => axiosInstance.delete(`/${taskId}`),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['tasks'],
          });
    
          toast.success('Task deleted!');
        },
        onError: (error) => {
          toast.error(error.response?.data || error.message);
        },
      });

      return { isDeleting, deleteTask }
}