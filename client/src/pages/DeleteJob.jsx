import { redirect } from 'react-router-dom';
import {customFetch} from '../utills/customFetch';
import { toast } from 'react-toastify';

export async function action({ params }) {
  try {
    await customFetch.delete(`/alljobs/${params.id}`);
    toast.success('Job deleted successfully');

  } catch (error) {
    toast.error(error.response.data.msg);
  }
  return redirect('/dashboard/alljobs');
}