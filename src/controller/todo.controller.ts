import { Request, response, Response } from "express";
import { CreateToDoSchema } from "../schema/todo.schema";
import { createTodo, findTodo, deleteTodo, findTodoList, findAndUpdateTodo } from "../service/todo.service";

export async function createTodoHandler(
    req: Request<{}, {}, CreateToDoSchema["body"]>,
    res: Response
) {
    const userId = res.locals.user._id;

    const body = req.body;

    const todo = await createTodo({ ...body, user: userId});

    return res.send(todo);
}

export async function getTodoHandler(req: Request, res: Response) {
    
    const result = await findTodoList(req.query);

    if(!result) {
        return res.sendStatus(404);
    }

    return res.send(result);
}

export async function updateTodoHandler(
    req: Request,
    res: Response
  ) {
    const userId = res.locals.user._id;
    const todoId = req.params.todoId;
    const update = req.body;

    const todo = await findTodo({ todoId });
    
    if (!todo) {
      return res.sendStatus(404);
    }
  
    if (String(todo.user) !== userId) {
      return res.status(403).send("This account is not allowed to make a change");
    }
  
    const updatedTodo = await findAndUpdateTodo({ todoId }, update, {
      new: true,
    });
  
    const result = {
        data: updatedTodo,
        message: "Record updated successfully",
    }

    return res.status(200).send(result);
}


export async function deleteTodoHandler(
    req: Request,
    res: Response
  ) {
    const userId = res.locals.user._id;
    const todoId = req.params.todoId;

    const todo = await findTodo({ todoId });
    
    if (!todo) {
      return res.sendStatus(404);
    }
    if (String(todo?.user) !== userId) {
      return res.status(403).send("This account is not allowed to make a change");
    }

    await deleteTodo({ todoId });
  
    return res.status(200).send("Record deleted successfully");
  }
