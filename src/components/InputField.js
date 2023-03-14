const InputField = ({
  type = "text",
  id,
  formData,
  blurHandler,
  changeHandler,
}) => {
  return (
    <>
      <input
        type={type}
        id={id}
        onBlur={blurHandler}
        onChange={changeHandler}
        value={formData[id]}
      ></input>
    </>
  );
};

export default InputField;
