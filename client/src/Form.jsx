import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { axiosInstance } from './utils';
import { toast } from 'react-toastify';

const Form = () => {
  const [newItemName, setNewItemName] = useState('');

  const queryClient = useQueryClient();

  const { mutate: createTask, isPending } = useMutation({
    mutationFn: (taskTitle) => axiosInstance.post('/', { title: taskTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('New task added!');
      setNewItemName('');
    },
    onError: (error) => {
      toast.error(error.response?.data?.msg || error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    createTask(newItemName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className='form-control'>
        <input
          type='text'
          id='form-input'
          className='form-input'
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button
          type='submit'
          className='btn'
          disabled={isPending}
          // style={{ opacity: isPending ? 0.5 : 1 }}
          style={isPending ? { opacity: 0.5 } : undefined}
        >
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
