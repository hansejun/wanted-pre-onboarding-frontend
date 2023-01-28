import instance from "./instance";

export const createTodo = async (payload) => {
  const response = await instance.post("todos", payload);
  return response;
};

export const getTodos = async () => {
  const response = await instance.get("todos");
  return response;
};

export const updateTodos = async (payload) => {
  console.log(payload);
  const response = await instance.put(`todos/${payload.id}`, payload.body);
  return response;
};

export const deleteTodo = async (payload) => {
  const response = await instance.delete(`todos/${payload}`);
  return response;
};
