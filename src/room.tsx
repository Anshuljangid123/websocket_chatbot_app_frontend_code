export function JoinRoom({close , reference } : any) {
    return (
        // <div className="self-center p-2 border border-violet-900 flex flex-col m-2 w-60"> 
        //     <span className="font-extrabold text-justify m-2">ENTER THE ID OF THE ROOM YOU WANT TO JOIN!! </span>
        //     <input ref = {reference} className="m-2  border border-gray-950 rounded-md" type="number"></input>
        //     <button onClick={close} className="border border-solid border-gray-800 bg-gray-900 text-white" >Submit</button>
        // </div>
        <div className='flex justify-center rounded'>
              <div className=' w-[60vh] m-2 p-4 rounded-xl bg-gray-600 text-black font-bold flex  flex-col'>
                <div className='p-2 m-2 bg-gray-400 rounded '>
                    ENTER THE ID OF THE ROOM YOU WANT TO JOIN .
                </div>
                <input ref = {reference} placeholder='enter room id : ' className='p-2 m-2 bg-gray-300 rounded text-black'></input>
                <button onClick={close} className='text-white p-2 ' type='submit' > JOIN ROOM  </button>
              </div>
          </div>


    )
}