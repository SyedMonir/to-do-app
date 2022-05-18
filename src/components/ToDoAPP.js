import React from 'react';

const ToDoAPP = () => {
  return (
    <>
      <div className="text-center my-8">
        <h1 className="text-5xl font-bold">To Do App</h1>
      </div>
      <div className="hero min-h-[80vh] bg-slate-700">
        <div className="hero-content flex-col-reverse lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Your Task</h1>
          </div>
          <div className="card flex-shrink-0 w-full  max-w-sm shadow-2xl bg-base-100">
            <h3 className="text-xl text-center font-bold pt-4">
              Add Your Task
            </h3>
            <div className="card-body">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Task Name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <textarea
                  className="textarea textarea-bordered "
                  name="description"
                  placeholder="Task Description"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Add Task</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoAPP;
