import { useContext, useState } from "react";
import SearchForm from "./Search";
import THead from "./THead";
import TaskCard from "./TaskCard";
import { TaskContext } from "../../context";
import { toast } from "react-toastify";
import AddOrEditTaskModal from "../modal/AddOrEditTaskModal";
import DeletePrompt from "../modal/DeletePrompt";

const TaskList = () => {
  const { state, dispatch } = useContext(TaskContext);
  const [showModal, setShowModal] = useState(false);
  const [addModal, setAddShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [singleDeleteModal, setSingleDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  const handleDeleteAll = () => {
    dispatch({ type: "REMOVE_ALL_TASK" });
    setShowDeleteModal(false);
    toast.success("All Task Deleted Successfully.");
  };
  const handleDeleteSingle = () => {
    dispatch({
      type: "REMOVE_FROM_TASK",
      payload: {
        ...selectedTask,
      },
    });
    toast.success("Task Deleted Successfully.");
    setSingleDeleteModal(false);
  };
  const handleTask = (task, term) => {
    setSelectedTask(task);
    if (term === "delete") {
      setSingleDeleteModal(true);
    } else {
      setShowModal(true);
    }
  };

  return (
    <section className="mb-20" id="tasks">
      {showModal && (
        <AddOrEditTaskModal
          initialValues={selectedTask}
          onClose={() => setShowModal(false)}
          isEditing={true}
        />
      )}
      {addModal && (
        <AddOrEditTaskModal onClose={() => setAddShowModal(false)} />
      )}
      {showDeleteModal && (
        <DeletePrompt
          onClick={handleDeleteAll}
          title={"Delete All"}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
      {singleDeleteModal && (
        <DeletePrompt
          onClick={() => handleDeleteSingle()}
          title={"Delete"}
          onClose={() => setSingleDeleteModal(false)}
        />
      )}

      <div className="container">
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <div className="mb-14 items-center justify-between sm:flex">
            <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
            <div className="flex items-center space-x-5">
              <SearchForm />
              <button
                onClick={() => setAddShowModal(true)}
                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
              >
                Delete All
              </button>
            </div>
          </div>
          <div className="overflow-auto">
            <table className="table-fixed overflow-auto xl:w-full">
              <THead />
              <tbody>
                {state.filteredTasks.length > 0 &&
                  state.filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      handleTask={handleTask}
                    />
                  ))}
              </tbody>
            </table>
            {state.filteredTasks.length < 1 && (
              <div className="flex flex-col gap-10 justify-end items-center  ">
                <img
                  className="h-[500px] w-[500px]"
                  src="/assets/Empty.png"
                  alt=""
                />
                <p>Task List is empty!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskList;
