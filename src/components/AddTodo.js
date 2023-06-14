import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export const AddTodo = (props) => {
  const { value, setValue, add } = props;
  return (
    <div className="flex flex-column align-items-center gap-2">
      <InputText
        style={{ background: "#616161", color: "#FFFFFF" }}
        className="w-full "
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            add(e.target.value);
          }
        }}
      />
      <Button
        className="w-min"
        label="Send"
        severity="info"
        onClick={() => {
          add(value);
        }}
      />
    </div>
  );
};
