import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './utils';
import SingleItem from './SingleItem';

const Items = () => {
  // useQuery handles data fetching, caching, and loading/error states
  const { isPending, data, error, isError } = useQuery({
    queryKey: ['tasks'], // unique key for caching this query
    // queryFn: () => axiosInstance.get('/'),
    queryFn: async () => {
      // axios response data is nested inside the `data` property
      const { data } = await axiosInstance.get('/'); // data = {taskList: Array(4)}
      return data;
    },
  });

  if (isPending) {
    return <p style={{ marginTop: '1rem' }}>Loading...</p>;
  }

  // if (error) {
  if (isError) {
    return <p style={{ marginTop: '1rem' }}>There was an error...</p>;
  }
  // if (error) {
  // console.log(error);
  // return <p style={{ marginTop: '1rem' }}>{error.message}</p>;
  // return <p style={{ marginTop: '1rem' }}>{error.response?.data}</p>;
  // }

  return (
    <div className='items'>
      {data.taskList?.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
