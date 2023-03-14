import FieldHOC from "./FieldHOC";
import InputField from "./InputField";

const NameFieldWithError = FieldHOC((props) => {
  return <InputField {...props} />;
});

export default NameFieldWithError;
