import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {

    const {_id,firstName,lastName,age,gender,about,skills,photoURL} = user;

    const dispatch = useDispatch();

    const handleSendRequest = async(status,_id) => {

      try{
        const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},{withCredentials:true});

        dispatch(removeUserFromFeed(_id));

      }
      catch(err){
        console.error(err);
      }
    }

    return(

             <div className="card bg-base-300 w-96 shadow-xl">
  <figure>
    <img
      src={photoURL}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age +","+gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>handleSendRequest("intrested",_id)}>Intrested</button>
    </div>
  </div>
</div>

    )
}

export default UserCard