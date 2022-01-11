import Mock from "mockjs";
import { mockTest } from "./data/filter";
import { login, loginOut, authRoutes } from "./data/user";
Mock.mock("http://127.0.0.1/api/login", "post", login);
Mock.mock("http://127.0.0.1/api/logout", "post", loginOut);
Mock.mock("http://127.0.0.1/api/authRoutes", "post", authRoutes);
Mock.mock("http://127.0.0.1/api/adminUser", "post", mockTest);
