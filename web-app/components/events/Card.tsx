export default function Card() {
    
    return (
        <div className="container mx-auto py-8 h-3/4">
            <div className="flex flex-col w-full items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100">
                <img className="object-cover w-full  h-96 md:h-auto md:w-56" src="./flyer.png" alt=""/>
                <div className="flex flex-col justify-between p-4 md:p-8">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">8 Juillet 2023 | Paris 12 | 19H</h5>
                    <p className="mb-3 font-normal text-gray-700">Ne manquez pas la soirée évènement de l’été ! <br /> <br />

                                                                Nous vous attendons nombreux pour vous affronter, rigoler ou vous détendre apère une longue semaine autour d’un verre et de vos jeux favoris.</p>
                </div>
                <div className="flex justify-center items-center pb-5 sm:pr-5 md:w-60">
                    <button type="button"
                            className="text-white border-2 border-custom-orange bg-custom-orange hover:bg-custom-hover-orange focus:outline-none font-medium rounded-lg text-sm md:text-base py-2 px-4 md:px-4 md:py-2 text-center ">J'y participe
                    </button>
                </div>
            </div>
        </div>
    )
}