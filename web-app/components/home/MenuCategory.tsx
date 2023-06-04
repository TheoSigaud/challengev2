import React, { useEffect, useState } from 'react';

export default function MenuCategory() {
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/category');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

    return (
        
        <nav className="bg-custom-pastel-orange border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                <div className="bg-custom-pastel-orange w-full md:block md:w-auto" id="navbar-default">
                <ul className="bg-custom-pastel-orange font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0">
                    {categories.map((category) => (
                        <li>
                            <a href="#" className="bg-custom-pastel-orange block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-custom-hover-orange hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-custom-orange md:p-0" aria-current="page" key={category.id}>{category.name}</a>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </nav>
    )
}