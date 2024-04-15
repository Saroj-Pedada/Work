import React, { useState } from "react";
import HttpnInstance from "../Api/nodeapi";

const Auth = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      HttpnInstance.post("/login", {
        username: username,
        password: password,
      }).then((response) => {
        const { token } = response.data;
        try {
          localStorage.setItem('token', token);
        } catch (error) {
          console.log("Login failed:", error);
        }
        props.setLoggedIn(true);
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="h-full w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl ring-2 ring-inset ring-[#3940ff] mt-[50px] p-5 w-fit mx-auto flex flex-col items-center"
      >
        <div className="mb-4">
          <label htmlFor="username" className="block font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Auth;
