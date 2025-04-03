export function JoinRoom({close , reference } : any) {
    return (
        
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