
import { Form, redirect, useNavigation, Link } from 'react-router-dom';

import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import {customFetch} from "../utills/customFetch.js"
import axios from 'axios';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/auth/register', data);
      toast.success('Registration successful');
      return redirect('/login');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const Register = ()=>{
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
    return (
<Wrapper>
<Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
      <FormRow type="text" labeltext="Name" name="name" />
      <FormRow type="text" labeltext="Last-Name" name="lastName" />
      <FormRow type="text" labeltext="Location" name="location" />
      <FormRow type="email" labeltext="Email" name="email" />
      <FormRow type="password" labeltext="Pasword" name="password" />
   
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <p>Already a member?
        <Link to="/Login" className="member-btn">Login</Link>
        </p>
    </Form>

</Wrapper>

    );
};





export default Register;



