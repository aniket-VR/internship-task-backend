export function responseContainer(res, result, message) {
  if (result) {
    return res.send({
      message,
    });
  } else {
    return res.send({
      message,
    });
  }
}
