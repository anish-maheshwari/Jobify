

import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import {customFetch} from '../utills/customFetch';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/auth/login', data);
      toast.success('Login successful');
      return redirect('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const Login = () => {
    const navigation = useNavigation();
    const navigate = useNavigate();
  
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'test@9400',
    };
    try {
      await customFetch.post('/auth/login', data);
      toast.success('take a test drive');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
    const isSubmitting = navigation.state === 'submitting';
    return (
      <Wrapper>
        <Form method='post' className='form'>
          <Logo />
          <h4>login</h4>
          <FormRow type='email' labeltext="Email" name='email'  />
          <FormRow type='password' labeltext="Password" name='password' />
          <button type='submit' className='btn btn-block' disabled={isSubmitting}>
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
          <button type='button' className='btn btn-block' onClick={loginDemoUser}>
          explore the app
        </button>
          <p>
            Not a member yet?
            <Link to='/register' className='member-btn'>
              Register
            </Link>
          </p>
        </Form>
      </Wrapper>
    );
  };




  
export default Login;