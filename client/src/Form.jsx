import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { axiosInstance } from './utils';

const Form = () => {
  const [newItemName, setNewItemName] = useState('');

  const { mutate: createTask, isPending } = useMutation({
    mutationFn: (taskTitle) => axiosInstance.post('/', { title: taskTitle }),
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
          type='text '
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
