import React from 'react';
// import { Slide } from 'react-awesome-reveal';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ListQuery = ({ item, queriesList,  setQueriesList}) => {
    // const { email } = useParams()
//   console.log(item)


    const { _id } = item 
    const handleDelete = (_id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if(result.isConfirmed){
                fetch(`http://localhost:5000/queries/${_id}`,{
                    method: "DELETE",
                })
                .then((res) => res.json())
                .then((data) =>{
                    console.log(data)
                    if(data.deleteCount > 0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                          });
                          const remaining = queriesList.filter(equ => equ._id !==_id)
                          setQueriesList(remaining)
                    }
                })
            }
          })
    }
    return (
        <div>
            <div key={item._id} className='w-10/12 mx-auto py-5'>
            <div className='sm:flex card-side items-center bg-base-100 shadow-xl'>
                <figure>
                    <img src={item.PhotoURL} alt={item.ItemName} />
                </figure>
                <div className='flex justify-between w-full p-4'>
                    <div>
                        <h2 className='card-title'>{item.productName
                        }</h2>
                    </div>
                    <div className="card-actions justify-end">
                        <div className='join join-vertical space-y-4'>
                            <Link to={`/update/${_id}`}>
                            <button className='btn join-item bg-green-500'>Update</button>
                            </Link>
                            <button onClick={() => handleDelete(_id)}
                                className='btn join-item bg-red-500'>
                                    Delete
                            </button>
                        </div>
                    </div>
            </div>
            </div>
            </div>
            </div >
    );
};

export default ListQuery;