const FieldHOC = (WrapperFunction) => {
  return function (props) {
    const {
      type,
      id,
      formData,
      formError,
      errorMessage,
      blurHandler,
      changeHandler,
    } = props;
    return (
      <>
        <WrapperFunction
          type={type}
          id={id}
          formData={formData}
          blurHandler={blurHandler}
          changeHandler={changeHandler}
        />
        <br />
        {errorMessage && formError[id] && (
          <span className="email-error" name="name-error">
            {errorMessage}
          </span>
        )}
      </>
    );
  };
};

export default FieldHOC;
