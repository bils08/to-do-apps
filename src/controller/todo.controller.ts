import { Request, response, Response } from "express";
import { CreateToDoSchema, UpdateToDoSchema } from "../schema/todo.schema";
import { createProduct, findTodo, update } from "../service/todo.service";

export async function createTodoHandler(
    req: Request<{}, {}, CreateToDoSchema["body"]>,
    res: Response
) {
    const userId = res.locals.user._id;

    const body = req.body;

    const todo = await createProduct({ ...body, user: userId});

    return res.send(todo);
}

export async function getTodoHandler(req: Request, res: Response) {
    
    const result = await findTodo(req.query);

    if(!result) {
        return res.sendStatus(404);
    }

    return res.send(result);
}

