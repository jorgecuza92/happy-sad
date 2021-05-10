import react from 'react';

function Application() {
  return (
    <div>
      <form action="#">
        <h3>Fill out the following:</h3>
        <input type='text' placeholder='User Id' name='userId' />
        <input type='text' placeholder='Company' name='company' />
        <input type='text' placeholder='Job Title' name='title' />
        <input type='date' name='date' />
        <input type='checkbox' name='assessment' id='assessment'/>
        <label>Assessment</label>
        <input type='checkbox' name='interiew' />
        <label>Interview</label>
        <input type='checkbox' name='rejection' />
        <lable>Rejection</lable>
        <input type='checkbox' name='visibility' />
        <label>Hide Application</label>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Application