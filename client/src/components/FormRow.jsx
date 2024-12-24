const FormRow = ({type,labeltext,name, defaultValue})=>{
    return (
        <div className="form-row">
        <label htmlFor={name} className="form-label">{labeltext}</label>
        <input type={type} id={name} name={name} className="form-input" defaultValue={defaultValue}  required/>
       
       
    </div>
    );
};
export default FormRow;

