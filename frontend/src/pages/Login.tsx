import { FormEventHandler, useContext, useState } from "react";
import { UserContext } from "../components/UserProvider";

const Login = () => {
  const { setUsername } = useContext(UserContext);
  const [input, setInput] = useState("");

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (input) {
      setUsername(input);
    }
  };

  return (
    <div className="w-screen h-screen justify-center items-center flex">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter username"
            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
          />
          <button
            type="submit"
            disabled={!input}
            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
