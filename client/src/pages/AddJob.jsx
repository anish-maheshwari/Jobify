import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utills/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import {customFetch} from '../utills/customFetch';
import FormRowSelect from '../components/FormRowSelect';


export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
  
    try {
      await customFetch.post('/alljobs', data);
      toast.success('Job added successfully');
      return redirect('alljobs');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add job</h4>
        <div className='form-center'>
          <FormRow type='text' labeltext='position' name='position' />
          <FormRow type='text'  labeltext='company' name='company' />
          <FormRow
            type='text'
            labeltext='job location'
            name='jobLocation'
            defaultValue={user.location}
          />
          <div className='form-row'>
  {/* <label htmlFor='jobStatus' className='form-label'>
    job status
  </label>
  <select
    name='jobStatus'
    id='jobStatus'
    className='form-select'
    defaultValue={JOB_TYPE.FULL_TIME}
  >
    {Object.values(JOB_TYPE).map((itemValue) => {
      return (
        <option key={itemValue} value={itemValue}>
          {itemValue}
        </option>
      );
    })}
  </select> */}
  <FormRowSelect
  labelText='job status'
  name='jobStatus'
  defaultValue={JOB_STATUS.PENDING}
  list={Object.values(JOB_STATUS)}
  />
<FormRowSelect
  name='jobType'
  labelText='job type'
  defaultValue={JOB_TYPE.FULL_TIME}
  list={Object.values(JOB_TYPE)}
  />
</div>

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

export default AddJob;