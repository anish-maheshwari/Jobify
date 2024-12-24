import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utills/constants.js';

import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import {customFetch} from '../utills/customFetch.js';

export const loader = async ({ params }) => {
    try {
      const { data } = await customFetch.get(`/alljobs/${params.id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.msg);
      return redirect('/dashboard/alljobs');
    }
  };
  export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
  
    try {
      await customFetch.patch(`/alljobs/${params.id}`, data);
      toast.success('Job edited successfully');
      return redirect('/dashboard/alljobs');
    } catch (error) {
      toast.error(error.response.data.msg);
      return error;
    }
  };
  
  const EditJob = () => {
    const { job } = useLoaderData();
    
  
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
  
    return (
      <Wrapper>
        <Form method='post' className='form'>
          <h4 className='form-title'>edit job</h4>
          <div className='form-center'>
            <FormRow type='text' labeltext='position' name='position' defaultValue={job.position} />
            <FormRow type='text' labeltext='company' name='company' defaultValue={job.company} />
            <FormRow
              type='text'
              labeltext='job location'
              name='jobLocation'
              defaultValue={job.jobLocation}
            />
  
            <FormRowSelect
              name='jobStatus'
              labelText='job status'
              defaultValue={job.jobStatus}
              list={Object.values(JOB_STATUS)}
            />
            <FormRowSelect
              name='jobType'
              labelText='job type'
              defaultValue={job.jobType}
              list={Object.values(JOB_TYPE)}
            />
            <button
              type='submit'
              className='btn btn-block form-btn '
              disabled={isSubmitting}
            >
              {isSubmitting ? 'submitting...' : 'submit'}
            </button>
          </div>
        </Form>
      </Wrapper>
    );
  };
  
  export default EditJob;




