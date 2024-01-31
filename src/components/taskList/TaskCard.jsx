/* eslint-disable react/prop-types */
import { StarFilledIcon } from "../../assets/icons/StarFilled";
import { useContext } from "react";
import { StarIcon } from "../../assets/icons/Start";
import { TaskContext } from "../../context";
const TaskCard = ({ task, handleTask }) => {
  const { state, dispatch } = useContext(TaskContext);
  const isFavorite = state.favoriteData.some(
    (favoriteTask) => favoriteTask.id === task.id
  );
  const handleToggleFavorite = (task) => {
    if (isFavorite) {
      dispatch({
        type: "REMOVE_FROM_FAVORITE",
        payload: {
          ...task,
        },
      });
    } else {
      dispatch({
        type: "ADD_TO_FAVORITE",
        payload: {
          ...task,
        },
      });
    }
  };
  const bgColors = [
    "bg-[#00D991A1]",
    "bg-[#FE1A1AB5]",
    "bg-[#8407E6A8]",
    "bg-[#10FBEDB2]",
    "bg-[#2F43F8BF]",
    "bg-[#BD560BB2]",
  ];

  const getRandomColorClass = () => {
    // Randomly select an index from the bgColors array
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
  };

  return (
    <>
      <tr
        key={task.id}
        className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2"
      >
        <td>
          {isFavorite ? (
            <StarFilledIcon
              className="cursor-pointer"
              onClick={() => handleToggleFavorite(task)}
            />
          ) : (
            <StarIcon
              className="cursor-pointer"
              onClick={() => handleToggleFavorite(task)}
            />
          )}
        </td>
        <td>{task.title}</td>
        <td>
          <div>{task.description}</div>
        </td>
        <td>
          <ul className="flex justify-center gap-1.5 flex-wrap">
            {task.tags.map((tag, index) => (
              <li key={index}>
                <span
                  className={`inline-block h-5 whitespace-nowrap rounded-[45px] px-2.5 text-sm capitalize text-[#F4F5F6] ${getRandomColorClass()}`}
                >
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </td>
        <td className="text-center capitalize">{task.priority}</td>
        <td>
          <div className="flex items-center justify-center space-x-3">
            <button
              className="text-red-500"
              onClick={() => handleTask(task, "delete")}
            >
              Delete
            </button>
            <button
              onClick={() => handleTask(task, "edit")}
              className="text-blue-500"
            >
              Edit
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TaskCard;
