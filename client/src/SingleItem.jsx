import { useUpdateTaskStatus, useDeleteTask } from './reactQueryCustomHooks';

const SingleItem = ({ item }) => {
  const { isPending, toggleTaskStatus } = useUpdateTaskStatus();
  const { isDeleting, deleteTask } = useDeleteTask();

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
