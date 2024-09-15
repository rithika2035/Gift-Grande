import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import Item from "../components/Item"
import { useContext, useState, useEffect } from "react"
import { ShopContext } from "../Context/ShopContext"


const Category = ({category, banner}) => {

  const {all_products} = useContext(ShopContext)
  const [sortedProducts, setSortedProducts] = useState(all_products);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Initialize sortedProducts with all_products when the component mounts
  useEffect(() => {
    setSortedProducts(all_products);
  }, [all_products]);

  // Function to sort by product name A-Z
  const sortByNameAZ = () => {
    const sorted = [...all_products].sort((a, b) => a.name.localeCompare(b.name));
    setSortedProducts(sorted);
  };

  // Function to sort by price low to high
  const sortByPriceLowToHigh = () => {
    const sorted = [...all_products].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
  };

  // Function to sort by price high to low
  const sortByPriceHighToLow = () => {
    const sorted = [...all_products].sort((a, b) => b.price - a.price);
    setSortedProducts(sorted);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <section className="p-20 py-12 xl:py-28">
      <div>
        <div>
          <img src={banner} alt="" className="block my-7 mx-auto"/>
        </div>
        <div className="flexBetween my-8 mx-2">
          <h5>
            <span className="font-bold">Showing All</span> out of all products
          </h5>
          <div className="relative">
            <button onClick={toggleDropdown} className="flexBetween max-sm:p-4 gap-x-4 px-8 py-3 rounded-5xl ring-1 ring-slate-900/15 ">Sort by <MdOutlineKeyboardArrowDown className="ml-2" /></button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li
                    onClick={sortByNameAZ}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Product name A-Z
                  </li>
                  <li
                    onClick={sortByPriceLowToHigh}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Price low to high
                  </li>
                  <li
                    onClick={sortByPriceHighToLow}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Price high to low
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/*Product container*/}
        <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
          
          {sortedProducts.map((item) => {
            if (category === item.category) {
              return <Item key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />;
            }
          })}
        </div>
      </div>      
    </section>
  )
}

export default Category