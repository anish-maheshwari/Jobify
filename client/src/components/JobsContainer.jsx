import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { FaBriefcase } from 'react-icons/fa';
import { useAllJobsContext } from '../pages/AllJobs';

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs } = data;
  const sortedJobs = jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const totalJobs = jobs.length;

  if (totalJobs === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
 
  return (
    <Wrapper>
       <div className='message'>
        <h3><FaBriefcase /> List of top jobs awaiting exceptional talent....</h3>
      </div>
  <div className='total-jobs'>
        <h3>Total Jobs: {totalJobs}</h3><br></br> <br></br>
      </div>
         <div className='jobs'>
        {sortedJobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;