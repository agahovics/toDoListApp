import { AddTodo } from "@/components/AddTodo";
import { Empty } from "@/components/Empty";
import { TodoList } from "@/components/TodoList";
import Head from "next/head";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

export default function Home() {
  const toastRef = useRef();
  const [todos, addTodo] = useState([]);
  const [isEdit, setEditMode] = useState(false);
  const [index, setIndex] = useState(undefined);
  const [value, setValue] = useState("");

  // This function adds a new item and create a toasts if the value is not empty.
  const add = (v) => {
    if (v !== "") {
      addTodo([...todos, v]);
      setValue("");
      toastRef.current.show({
        severity: "info",
        summary: "Added",
        detail: "You have succesfuly created a new item",
      });
    }
  };

  return (
    <>
      <Head>
        <title>toDoListApp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Toast ref={toastRef} position="bottom-right" />
        <div className="flex justify-content-center align-items-center h-screen w-full">
          <Card
            style={{
              background: "#f0fdfa",
              color: "#212121",
              height: "80vh",
              overflow: "hidden",
            }}
            className="w-12 text-center md:w-6"
            title="toDoListApp"
          >
            <AddTodo value={value} setValue={setValue} add={add} />
            <Divider />
            <div className="card flex justify-content-center">
              {todos.length > 0 ? (
                <TodoList
                  todos={todos}
                  isEdit={isEdit}
                  setEditMode={setEditMode}
                  setIndex={setIndex}
                  index={index}
                  addTodo={addTodo}
                  toastRef={toastRef}
                />
              ) : (
                <Empty />
              )}
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
