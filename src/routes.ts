import { Express, Request, Response } from "express";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from './middleware/validateResource';
import { createSessionSchema } from "./schema/session.schema";
import { createToDoSchema } from "./schema/todo.schema";
import { createUserSchema } from "./schema/user.schema";
import { createTodoHandler, deleteTodoHandler, getTodoHandler, updateTodoHandler } from "./controller/todo.controller";


function routes(app: Express) {
    app.get('/health-check', (req: Request, res: Response) => res.sendStatus(200));

    app.post('/api/users/add', validateResource(createUserSchema), createUserHandler);

    app.post('/api/login', validateResource(createSessionSchema), createUserSessionHandler);

    app.get('/api/sessions', requireUser, getUserSessionHandler)

    app.post('/api/logout', requireUser, deleteSessionHandler);
    
    app.post(
        "/api/todo/add",
        [requireUser, validateResource(createToDoSchema)],
        createTodoHandler
    );

    app.get("/api/todo/list", requireUser, getTodoHandler);

    app.put("/api/todo/:todoId", requireUser, updateTodoHandler);

    app.delete("/api/todo/:todoId", requireUser, deleteTodoHandler);
    
}

export default routes;