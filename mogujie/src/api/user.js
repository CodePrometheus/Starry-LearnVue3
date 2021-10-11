import request from '../utils/request'

/**
 * login
 */
export const login = (params) =>
  request({
    url: "/user/login",
    data: params,
    method: "post",
  });

export const getUser = () =>
  request({
    url: "/user/about",
    method: "get",
  });
