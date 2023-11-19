import react, {useState} from "react"
import { GoKebabHorizontal } from "react-icons/go";

import { CreateAdvertiserPopup,CreateHandlePopup } from "./CreateAdvertiserPagePopups";


export const AdvertiserTables = (props) => {

    const [createHandlePopup, setCreateHandlePopup] =useState(false)
    const [createAdvertiserPopup, setCreateAdvertiserPopup] = useState(false)

    const createHandle = () => {
        setCreateHandlePopup(!createHandlePopup)
    }
    const createAdvertiser = () => {
        setCreateAdvertiserPopup(!createAdvertiserPopup)
    }

    const list = props.list
    console.log(list)
    return (
        <div className={`rounded-lg border border-solid border-gray-200 bg-gray-100  h-96 p-5 flex flex-col justify-between ${props.tableSize=="small" ? 'w-1/3' : props.tableSize=="big" ? "w-2/3" : props.tableSize=="medium" ? "w-2/2" : null}`}>
           <div className="flex flex-col gap-4 ">
           <div className="flex justify-between items-center ">
                <h1 className="text-gray-500 font-bold .text-sm  font-poppins">{props.tableName}</h1>
                <GoKebabHorizontal className="text-gray-500 " />
            </div>
            { props.tableName=="Handles" ? (
            <div className="flex flex-wrap">
                {list.map((item) => (
                 
                        <div key={item.id} className="flex items-center gap-4 w-1/2">
                            <img src={item.image} className=" rounded-3xl" />
     
                        </div>
                   
                ))}
            </div>
            )   : props.tableName=="Advertisers" ? (
                <div className="flex flex-col items-center gap-4">
                {list.map((item) => (
                 
                        <div key={item.id} className="flex px-10 gap-12 rounded-full border border-gray-200 bg-white p-4 w-11/12 h-16">
                            <p className="w-4/12 ">{item.name}</p>
                            <p>{item.email}</p>
                           
     
                        </div>
                   
                ))}
                </div>
            ) : null}
            </div>
            <div className="flex justify-end">
                {props.tableName=="Handles" ? <button onClick={() => createHandle()} className="flex items-center w-11 h-11 gradient text-white bg-primary-600 hover:bg-primary-700  items-center justify-center rounded-lg text-4xl  text-center ">+</button>
                : <button  onClick={() => createAdvertiser()}className="flex items-center w-11 h-11 gradient text-white bg-primary-600 hover:bg-primary-700  items-center justify-center rounded-lg text-4xl  text-center ">+</button>}
                
            </div>
        {createHandlePopup ? <CreateHandlePopup createHandleFunction={createHandle}/> : null}
        {createAdvertiserPopup ? <CreateAdvertiserPopup createAdvertiserFunction={createAdvertiser}/> : null}
        </div>
       
    )

}