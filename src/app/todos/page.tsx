"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { api } from "convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";

export default function TodosPage() {
  const todos = useQuery(api.todos.list);
  const changeCompletion = useMutation(api.todos.changeCompletion);
  const addTodo = useMutation(api.todos.add);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const [todoText, setTodoText] = useState("");

  return (
    <main className="flex flex-col items-center justify-center pt-16">
      <Card className="w-[90%] max-w-md">
        <CardHeader>
          <CardTitle>Todos</CardTitle>
        </CardHeader>
        <CardContent>
          {!todos && <Loader2 className="mx-auto block size-4 animate-spin" />}
          {todos && todos.length === 0 && (
            <p className="text-foreground/50 text-center text-sm">
              No todos found
            </p>
          )}
          {todos &&
            todos.length > 0 &&
            todos.map((todo) => (
              <div key={todo._id} className="group flex items-center gap-2">
                <Checkbox
                  className="cursor-pointer"
                  checked={todo.completed}
                  onCheckedChange={(checked) =>
                    changeCompletion({
                      id: todo._id,
                      completed: checked as boolean,
                    })
                  }
                />
                {todo.completed ? (
                  <p className="line-through opacity-50">{todo.title}</p>
                ) : (
                  <p>{todo.title}</p>
                )}
                <button
                  className="hidden cursor-pointer group-hover:block"
                  onClick={() => deleteTodo({ id: todo._id })}
                >
                  <Trash className="hover:text-foreground text-foreground/50 size-4" />
                </button>
              </div>
            ))}
          <div className="mt-4 flex flex-col gap-2 md:flex-row">
            <Input
              placeholder="Add a todo"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
            <Button
              className="cursor-pointer"
              disabled={todoText.trim() === ""}
              onClick={async () => {
                setTodoText("");
                await addTodo({ title: todoText });
              }}
            >
              Add Todo
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
