export default function Booking() {
    
    return (
        <div className="container mx-auto py-8 h-3/4">
            <div className="bg-white py-10 mx-auto md:w-1/3 max-w-xs h-fit rounded-l shadow-lg">
                <div>
                    <hr />
                </div>
                <form className="w-full max-w-sm">
                    <div className="flex items-center border-b border-teal-500 py-2">
                        <label htmlFor="Nom">Nom</label>
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="ex: Marie" aria-label="Full name"/>
                    </div>
                </form>
            <div/>
        </div></div>
    )
}