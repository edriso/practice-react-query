import { useState } from 'react';
import { useCreateTask } from './reactQueryCustomHooks';

const Form = () => {
  const [newItemName, setNewItemName] = useState('');

  const { createTask, isPending } = useCreateTask();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Note we can have onSuccess here too, YAY!!!
    createTask(newItemName, {
      onSuccess: () => {
        setNewItemName('');
      },
    });
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
