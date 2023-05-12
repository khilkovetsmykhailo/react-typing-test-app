import type { Test } from "../api";
import dayjs from "dayjs";

type Props = {
  items: Test[];
};

const Leaderboard: React.FC<Props> = ({ items }) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr>
          <th>Username</th>
          <th>Date</th>
          <th>WPM</th>
          <th>Accuracy</th>
        </tr>
      </thead>

      <tbody>
        {items.map(({ user, wpm, accuracy, createdAt }) => (
          <tr>
            <td className="text-center">{user}</td>
            <td className="text-center">{dayjs(createdAt).format("YYYY-MM-DD h:mmA")}</td>
            <td className="text-center">{wpm}</td>
            <td className="text-center">{accuracy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
