import { useEffect, useState, useContext } from "react";

import { getLeaderboard } from "../api";
import type { Test } from "../api";
import { UserContext } from "../components/UserProvider";
import { Link } from "react-router-dom";
import Leaderboard from "../components/Leaderboard";

const Home = () => {
  const { username } = useContext(UserContext);

  const [leaderboard, setLeaderboard] = useState<Test[]>([]);

  useEffect(() => {
    getLeaderboard().then((data) => {
      setLeaderboard(data || []);
    });
  }, []);

  return (
    <div className="mt-8">
      <div className="flex flex-row justify-between items-center">
        <h6 className="text-xl font-semibold">Welcome, {username}!</h6>

        <Link to="/test">
          <span className="text-purple-600 underline">Go to test</span>
        </Link>
      </div>

      <Leaderboard items={leaderboard} />
    </div>
  );
};

export default Home;
