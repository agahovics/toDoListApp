import { TodoListItem } from "@/components/TodoListItem";
import { OrderList } from "primereact/orderlist";

export const TodoList = (props) => {
  const { todos, isEdit, setEditMode, setIndex, index, addTodo, toastRef } =
    props;

  return (
    <OrderList
      value={todos}
      onChange={(e) => addTodo(e.value)}
      itemTemplate={(item) => {
        let i = todos.findIndex((x) => x === item);
        return (
          <TodoListItem
            item={item}
            isEdit={isEdit}
            todos={todos}
            addTodo={addTodo}
            toastRef={toastRef}
            setEditMode={setEditMode}
            setIndex={setIndex}
            i={i}
            index={index}
          />
        );
      }}
      dragdrop
      style={{ width: "80vw" }}
    />
  );
};
