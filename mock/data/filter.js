import Mock from "mockjs";

const mockTest = (params) => {
  return Mock.mock({
    // id: "@integer(1, 100)",
    // username: "@string('lower', 5)",
    // nickname: "@ctitle",
    // name_id: "@integer(1, 10)",
    // "name|2": {
    //   name: "name",
    //   id: 1,
    // },
    // createtime: "@datetime",
  })
};

export { mockTest };
