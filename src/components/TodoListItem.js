import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export const TodoListItem = (props) => {
  const {
    item,
    isEdit,
    todos,
    addTodo,
    toastRef,
    setEditMode,
    setIndex,
    i,
    index,
  } = props;

  return isEdit && i == index ? (
    <div className="flex  justify-content-between p-1 align-items-center gap-8">
      <InputText
        defaultValue={item}
        onChange={(e) => {
          todos[i] = e.target.value;
          addTodo(todos);

        }}
      />
      <Button
        style={{ background: "#212121" }}
        size="small"
        icon={<i className="pi pi-pencil"></i>}
        onClick={() => {
          setEditMode(false);
          addTodo(todos);

        }}
      />
    </div>
  ) : (
    <div className="flex  justify-content-between p-1 align-items-center gap-8">
      <span className="font-bold text-900">{item}</span>
      <div className="flex gap-2">
        <Button
          style={{ background: "#212121" }}
          size="small"
          icon={<i className="pi pi-trash"></i>}
          onClick={() => {
            let i = todos.findIndex((x) => x === item);
            todos.splice(i, 1);
            addTodo([...todos]);
            
            toastRef.current.show({
              severity: "success",
              summary: "Completed✅",
              detail: "You have succesfuly completed-keep going!",
            });
          }}
        />
        <Button
          style={{ background: "#212121" }}
          size="small"
          icon={<i className="pi pi-pencil"></i>}
          onClick={() => {
            setEditMode(true);
            setIndex(i);
          }}
        />
      </div>
    </div>
  );
};
