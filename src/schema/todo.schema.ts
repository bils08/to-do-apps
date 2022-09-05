import { object, string, TypeOf } from "zod";

const payload = ({
    body: object({
        status: string({
            required_error: 'status is required',
        }),
        todo: string({
            required_error: 'todo is required',
        }),
    }),
});

export const createToDoSchema = object({
    ...payload,
});


export const updateToDoSchema = object({
    ...payload,
});

export const deleteToDoSchema = object({
    ...payload,
});

export const getToDoSchema = object({
    ...payload,
});

export type CreateToDoSchema = TypeOf<typeof createToDoSchema>;
export type UpdateToDoSchema = TypeOf<typeof updateToDoSchema>;
export type GetToDoSchema = TypeOf<typeof getToDoSchema>;
export type DeleteToDoSchema = TypeOf<typeof deleteToDoSchema>;
