import react, {useState} from 'react'


const EmailConfirmationPopup = (props) => {

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center 	
        bg-white bg-opacity-60 z-20">
            <div className="bg-white w-1/2 h-1/3 rounded-3xl flex flex-col justify-between p-10">
                <div className="flex w-full justify-center">
                    <h1 className="w-3/5 text-gray-500 font-bold text-base font-poppins">
                        We have sent a code to your e-mail <span>{props.email}</span>
                        Please enter the 6 digits on the following space to confirm the bid</h1>
                </div>
                <div className="flex w-full justify-center">
                    <input placeholder="Digit your Code" type="text" className="w-2/5 h-12 rounded-3xl border border-gray-300 bg-gray-100 text-center font-poppins text-sm font-bold flex justify-center" />
                </div>
                <div className="flex justify-center w-1/5">
                    <button className="flex items-center w-11 h-11 gradient text-white bg-primary-600 hover:bg-primary-700  items-center justify-center rounded-full text-center cursor-pointer text-2xl ">CONFIRM</button>
                </div>
            </div>


        </div>
    )
}

const BiddingConfirmation = (props) => {

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center 	
        bg-white bg-opacity-60 z-20">
            <div className="bg-white w-1/2 h-1/3 rounded-3xl flex flex-col justify-between p-10">
                <div className="flex flex-col items-center h-full justify-between">
                    <img src="" ></img>
                    <h1 className="text-2xl font-bold text-black font-poppins">Thank you for bidding</h1>
                    <div>
                        <p>You have confirmed a bid for <span>Media Capital</span> social meida ads.</p>
                        <p>Hope this will help you sky rocket your sales!</p>
                    </div>
                </div>

            </div>
        </div>    
    )
}






export default emailConfirmationPopup;