import { z } from "zod";
export default function (schema, values) {
  const validation = z.object(schema).safeParse(values);

  const errors = validation.error?.issues.map((error) => {
    return {
      path: error.path.length ? error.path.join("-") : error.path[0],
      message: error.message,
    };
  }); // undefined

  let result = { success: validation.success };

  if (validation.success) result.data = validation.data;
  else result.errors = errors;

  return result;
}
