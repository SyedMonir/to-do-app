import { signOut } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { PacmanLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import auth from '../firebase.init';

const ToDoAPP = () => {
  // React hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Query
  const {
    isLoading,
    error,
    data: todos,
    refetch,
  } = useQuery('todo', () =>
    fetch('https://to-do-for-yourself.herokuapp.com/todo').then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return (
      <>
        <div className="absolute top-2/4 left-[45%] z-50">
          <PacmanLoader color={'black'} size={25} />
        </div>
      </>
    );
  }

  if (error) {
    console.log('An error has occurred: ' + error?.message);
  }

  const onSubmit = (data) => {
    // console.log(data);
    const todo = {
      name: data.name,
      description: data.description,
      completed: false,
    };

    fetch('https://to-do-for-yourself.herokuapp.com/todo', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        refetch();
        reset();
      });
  };

  const handleComplete = (id) => {
    // console.log(id);

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Complete!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://to-do-for-yourself.herokuapp.com/todo/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ completed: true }),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            refetch();
          });
        Swal.fire('Completed!', 'Successfully completed your task!', 'success');
      }
    });
  };

  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://to-do-for-yourself.herokuapp.com/todo/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((result) => {
            // console.log(result);
            refetch();
          });
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      }
    });
  };

  return (
    <>
      <div className="text-center my-8 flex justify-center items-center">
        <h1 className="text-5xl font-bold">To Do App</h1>
        <small
          onClick={() => signOut(auth)}
          className="pt-8 ml-4 cursor-pointer"
        >
          Sign-out
        </small>
      </div>

      <section className="body-font bg-slate-900">
        <div className="container px-5 py-12 mx-auto flex flex-wrap ">
          <div className="lg:w-2/3 md:w-1/2 w-full md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-center my-4 text-3xl">
              Your {new Date().getDate()}/{new Date().getMonth()}/
              {new Date().getFullYear()} To Do List
            </h1>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Action</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {todos?.map((td, index) => (
                    <tr key={td._id}>
                      <th className={td?.completed ? 'line-through' : ''}>
                        {index + 1}
                      </th>
                      <td className={td?.completed ? 'line-through' : ''}>
                        {td?.name}
                      </td>
                      <td
                        className={td?.completed ? 'line-through' : ''}
                        title={td?.description}
                      >
                        {td?.description?.length > 50 ? (
                          <span>{td?.description.slice(0, 50)} ..</span>
                        ) : (
                          td?.description
                        )}
                      </td>
                      <td>
                        <button
                          disabled={td?.completed}
                          onClick={() => handleComplete(td._id)}
                          className="btn btn-xs btn-secondary"
                        >
                          Confirm
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(td._id)}
                          className="btn btn-xs btn-error"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/2 bg-gray-100 rounded-lg p-4 flex flex-col md:ml-auto w-full mt-10 md:mt-0 h-full lg:mt-[70px] ">
            <h2 className="text-gray-900 text-lg text-center font-medium title-font mb-3">
              Add Your Task
            </h2>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Task Name"
                    className="input input-bordered"
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'name is required',
                      },
                    })}
                  />
                  <label className="label">
                    {errors.name?.type === 'required' && (
                      <span className="label-text-alt text-red-600">
                        {errors.name?.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="form-control">
                  <textarea
                    className="textarea textarea-bordered "
                    name="description"
                    placeholder="Task Description"
                    {...register('description', {
                      required: {
                        value: true,
                        message: 'Description is required',
                      },
                    })}
                  />
                  <label className="label">
                    {errors.description?.type === 'required' && (
                      <span className="label-text-alt text-red-600">
                        {errors.description?.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ToDoAPP;
