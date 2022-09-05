import { Express, Request, Response } from "express";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from './middleware/validateResource';
import { createSessionSchema } from "./schema/session.schema";
import { createToDoSchema } from "./schema/todo.schema";
import { createUserSchema } from "./schema/user.schema";
import { createTodoHandler, getTodoHandler } from "./controller/todo.controller";


function routes(app: Express) {
    app.get('/health-check', (req: Request, res: Response) => res.sendStatus(200));

    app.post('/api/users/submit', validateResource(createUserSchema), createUserHandler);

    app.post('/api/users/sessions', validateResource(createSessionSchema), createUserSessionHandler);

    app.get('/api/users/sessions', requireUser, getUserSessionHandler)

    app.post('/api/users/sessions/delete', requireUser, deleteSessionHandler);
    
    app.post(
        "/api/todo/add",
        [requireUser, validateResource(createToDoSchema)],
        createTodoHandler
      );

    app.get(
        "/api/todo/list",
        requireUser,
        getTodoHandler
    );
    
}

export default routes;