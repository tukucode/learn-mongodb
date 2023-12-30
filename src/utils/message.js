export default function (res, code, message, data, pagintaion) {
  res.status(code).send({
    code,
    message,
    data,
    pagintaion,
  });
}
