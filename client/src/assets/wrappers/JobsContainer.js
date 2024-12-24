import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 1rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  .message{
    /* background-color: #f4f4f9; Light background color */
  padding: 15px;
  border-radius: 8px; /* Rounded corners */
  margin-bottom: 20px; /* Space below the message */
  text-align: center;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  */
  }
  .message h3 svg {
  margin-right: 10px; /* Adds space between the icon and the text */
  fill:#2cb1bc; /* Set icon color to blue */
  vertical-align: middle; /* Align the icon with the text */
}

  @media (min-width: 1120px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }

`;
export default Wrapper;
