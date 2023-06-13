import Head from "next/head";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { OrderList } from "primereact/orderlist";
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const toastRef = useRef()
  const [todos, addTodo] = useState([]);
  const [isEdit, setEditMode] = useState(false)
  const [index, setIndex] = useState(undefined)
  const [value, setValue] = useState("")
  
  //This function adds a new item and create a toasts if the value is not empty.
  const add = (v) => {
    if (v !== "") {
      addTodo([...todos, v]);
      setValue("");
      toastRef.current.show({ severity: 'info', summary: 'Added', detail: 'You have succesfuly created a new item' });
    }
  }


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
              color: "#212121", height: "80vh",overflow:"hidden"
            }}
            className="w-12 text-center md:w-6"
            title="toDoListApp"
          >
            <div className="flex flex-column align-items-center gap-2">
              <InputText
                style={{ background: "#616161", color: "#FFFFFF" }}
                className="w-full "
                value={value} onChange={(e) => {
                  setValue(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    add(e.target.value)
                  }
                }}
              />
              <Button className="w-min" label="Send" severity="info" onClick={() => {
                add(value)
              }
              } />
            </div>

            <Divider />

            <div className="card flex justify-content-center">
              {todos.length > 0 ? (
                <OrderList
                  value={todos}
                  onChange={(e) => addTodo(e.value)}
                  itemTemplate={(item) => {
                    let i = todos.findIndex(x => x === item)
                    return isEdit && i == index ? <div className="flex  justify-content-between p-1 align-items-center gap-8">
                      <InputText defaultValue={item} onChange={(e) => {
                        todos[i] = e.target.value
                        addTodo(todos)
                      }} />
                      <Button
                        style={{ background: "#212121" }}
                        size="small"
                        icon={<i className="pi pi-pencil"></i>}
                        onClick={() => {
                          setEditMode(false)
                        }}
                      />
                    </div> : <div className="flex  justify-content-between p-1 align-items-center gap-8">
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
                            toastRef.current.show({ severity: 'success', summary: 'Completed✅', detail: 'You have succesfuly completed-keep going!' });
                          }}
                        />
                        <Button
                          style={{ background: "#212121" }}
                          size="small"
                          icon={<i className="pi pi-pencil"></i>}
                          onClick={() => {
                            setEditMode(true)
                            setIndex(i)
                          }}
                        />
                      </div>
                    </div>
                  }}
                  dragdrop
                  style={{ width: "80vw" }}
                />
              ) : (
                <div>It seems like a bit quiet here 🥱</div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
