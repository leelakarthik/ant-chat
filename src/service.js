export const encrypt = (data) => {
  console.log(data);
  data = data.split("").reverse();
  for (let i = 0; i < data.length - 1; i++) {
    data[i] += "*";
  }
  let res = "";
  data = data
    .join("")
    .split("")
    .forEach((i) => {
      res += i.charCodeAt(0);
    });
  return res;
};
export const decrypt = (data) => {
  console.log(data);
  let res = "";
  data
    .split("42")
    .reverse()
    .forEach((i) => (res += String.fromCharCode(i)));
  return res;
};

/*
'getMessageArray' function is used to populate data and returns array of objects for user input
*/
export function getMessageArray(messages, value) {
  console.log(messages, value);
  return [
    ...messages,
    {
      id: messages.length,
      type: "sent",
      msg: value,
    },
  ];
}
/*
'dataSpread' function is used to populate data and returns array of objects for results from other users
*/
export function dataSpread(data, len) {
  let result = [];
  try {
    // console.log("dataSpread = ", data);
    result.push({
      id: len++,
      type: "received",
      msg: data,
    });
  } catch (err) {
    console.log(err);
    alert("error occured");
  }
  return result;
}
