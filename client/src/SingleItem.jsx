import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from './utils';
import { toast } from 'react-toastify';

const SingleItem = ({ item }) => {
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

  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.isDone}
        onChange={() =>
          toggleTaskStatus({
            taskId: item.id,
            taskIsDone: item.isDone,
          })
        }
        disabled={isPending}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className='btn remove-btn'
        type='button'
        onClick={() => deleteTask(item.id)}
        disabled={isDeleting}
        style={isDeleting ? { opacity: 0.5 } : undefined}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
