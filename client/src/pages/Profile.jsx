import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import {customFetch} from '../utills/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
    const formData = await request.formData();
  
    const file = formData.get('avatar');
    if (file && file.size > 1000000) {
      toast.error('Image size too large');
      return null;
    }
  
    try {
      await customFetch.patch('/users/update-user', formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return null;
  };

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>profile</h4>

        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='image' className='form-label'>
              Select an image file (max 1.0 MB):
            </label>
            <input
              type='file'
              id='avatar'
              name='avatar'
              className='form-input'
              accept='image/*'
            />
          </div>
          <FormRow type='text'  labeltext='Name' name='name' defaultValue={name} />
          <FormRow
            type='text'
            labeltext='Last Name'
            name='lastName'
            defaultValue={lastName}
          />
          <FormRow type='email'  labeltext='Email' name='email' defaultValue={email} />
          <FormRow type='text'  labeltext='Location' name='location' defaultValue={location} />
          <button
            className='btn btn-block form-btn'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'save changes'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;