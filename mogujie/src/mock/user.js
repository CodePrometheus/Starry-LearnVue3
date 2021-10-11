import Mock from "mockjs";

export default {
  // login
  login: (config) => {
    const { username, password } = JSON.parse(config.body);

    if (username === "admin" && password === "admin") {
      return Mock.mock({
        status: 200,
        msg: "登录成功",
        data: {
          token: "starry-mogujie",
          avatar: "https://avatars.githubusercontent.com/u/42513321?v=4",
          username: "starry",
        },
      });
    } else {
      return Mock.mock({
        status: 404,
        msg: "账号或密码错误",
        data: {},
      });
    }
  },

  getUser() {
    let data = "";
    if (JSON.parse(config.body)["token"] == "4378488sdsd29399281xjdjfkdf") {
      data = {
        data: {
          token: "starry-mogujie",
          avatar: "https://avatars.githubusercontent.com/u/42513321?v=4",
          username: "starry",
        },
        status: 200,
        msg: "请求成功",
      };
    } else {
      data = {
        data: "",
        status: 403,
        msg: "未登录",
      };
    }
    return data;
  },
};
