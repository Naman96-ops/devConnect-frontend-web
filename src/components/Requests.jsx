import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequests } from "../utils/requestSlice"

const Requests = () => {

    const requests = useSelector((store) => store.requests)

    const dispatch = useDispatch()

    const fetchRequests = async() => {
        try{

            const res = await axios(BASE_URL+"/user/requests/received",
                {withCredentials:true})

                console.log(res.data.data);
                dispatch(addRequests(res.data.data))

        }
        catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
          fetchRequests()
    },[])

    if(!requests) return;

  if(requests.length === 0) return <h1>No Request Found!!</h1>

    return(
        <div className="text-center my-10">
            <h1 className="text-bold  text-4xl">Requests</h1>

         {requests.map((request) => {

            const{_id,firstName,lastName,photoURL,age,gender,about} = request.fromUserId;

            return(
                <div key={_id} className=" flex justify-between items-center m-4 p-4  rounded-lg bg-base-300 w-2/3 mx-auto">
                <div>
                    <img alt="photo" className="w-20 h-20 rounded-full" src={photoURL} />
                </div>
                <div className="text-left mx-4">
                    <h2 className="fond-bold text-xl">{firstName+" "+lastName}</h2>
                    <p>{age+","+gender}</p>
                  <p>{about}</p>
                </div>
                   <div className="">
                    <button className="btn btn-primary mx-2">Reject</button>
                    <button className="btn btn-secondary mx-2">Accept</button>
                </div>
                </div>
            )
         }

            
         )}

        </div>

    )
}

export default Requests;