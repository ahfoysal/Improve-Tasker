/* eslint-disable react/prop-types */

import { toast } from "react-toastify";
import { useForm } from "../../utility/useForm";
import { TaskContext } from "../../context";
import { useContext } from "react";

export default function AddOrEditTaskModal({
  onClose,

  initialValues = {},
  isEditing = false,
}) {
  const { dispatch } = useContext(TaskContext);

  const { formData, errors, handleChange, handleSubmit } =
    useForm(initialValues);
  const handleForm = (e) => {
    const formData = handleSubmit(e);
    const { tags, ...restData } = formData;

    const newTask = {
      ...restData,
      id: crypto.randomUUID(),
      tags: tags.split(",").map((tag) => tag.trim()),
    };
    if (!isEditing) {
      console.log("first");

      dispatch({
        type: "ADD_TO_TASK",
        payload: {
          ...newTask,
        },
      });
      onClose();
      toast.success("Task Added Successfully.");
    } else {
      dispatch({
        type: "EDIT_TASK",
        payload: {
          ...newTask,
        },
      }); 
      onClose();
      toast.success("Task Edited Successfully.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] sm:max-w-[600px] lg:max-w-[984px] p-4   ">
        <form
          onSubmit={handleForm}
          className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11  max-h-[90vh] overflow-y-auto"
        >
          <div className="space-y-2 lg:space-y-3 mt-10 ">
            <label htmlFor="title">Title</label>
            <input
              className={`block w-full rounded-md bg-[#2D323F] px-3 py-2.5`}
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <span className="text-sm text-red-600 text-center w-full">
                Title is Required
              </span>
            )}
          </div>

          <div className="space-y-2 lg:space-y-3 mt-10">
            <label htmlFor="description">Description</label>
            <textarea
              className={`block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5`}
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            {errors.description && (
              <span className="text-sm text-red-600 text-center w-full">
                Description is Required
              </span>
            )}
          </div>

          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3 mt-10">
              <label htmlFor="tags">Tags</label>
              <input
                className={`block w-full rounded-md bg-[#2D323F] px-3 py-2.5`}
                type="text"
                name="tags"
                id="tags"
                value={formData.tags}
                onChange={handleChange}
              />
              {errors.tags && (
                <span className="text-sm text-red-600 text-center w-full">
                  Tags is Required
                </span>
              )}
            </div>

            <div className="space-y-2 lg:space-y-3 mt-10">
              <label htmlFor="priority">Priority</label>
              <select
                className={`block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5`}
                name="priority"
                id="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {errors.priority && (
                <span className="text-sm text-red-600 text-center w-full">
                  Priority is Required
                </span>
              )}
            </div>
          </div>

          <div className="mt-16 flex gap-6 justify-center lg:mt-20">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              {!isEditing ? " Create new Task" : "Edit Task "}
            </button>
            <button
              onClick={onClose}
              type="submit"
              className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
