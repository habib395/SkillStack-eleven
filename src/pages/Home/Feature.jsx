import { useNavigate } from "react-router-dom";
import { CiCoffeeCup } from "react-icons/ci";
import { MdSoap } from "react-icons/md";
import { MdPersonalInjury } from "react-icons/md";
import { FaOilCan } from "react-icons/fa6";
import { FaHandHoldingHeart } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { LuCupSoda } from "react-icons/lu";
import { FaDroplet } from "react-icons/fa6";

const Feature = () => {
  const navigate = useNavigate();

  // Define categories with appropriate filtering keys
  const categories = [
    { icon: <CiCoffeeCup />, label: "Tea", key: "Coffee" },
    { icon: <MdSoap />, label: "Soap", key: "Soap" },
    { icon: <MdPersonalInjury />, label: "Personal Care", key: "Personal Care" },
    { icon: <FaOilCan />, label: "Cooking Oil", key: "Cooking Oil" },
    { icon: <FaHandHoldingHeart />, label: "Healthcare", key: "Healthcare" },
    { icon: <MdShoppingCart />, label: "Food & Beverages", key: "Shopping" },
    { icon: <LuCupSoda />, label: "Soft Drinks", key: "Soft Drink" },
    { icon: <FaDroplet />, label: "Shopping", key: "Liquids" },
  ];

  return (  
    <div>
      <h2 className="text-blue-500 font-bold text-xl sm:text-4xl text-center py-3">
        FEATURED CATEGORY
      </h2>
      <div className="w-11/12 mx-auto grid grid-cols-2 md:grid-cols-8 gap-6 text-center">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/category/${item.label}`)}
            className="cursor-pointer flex flex-col items-center p-4 hover:scale-110 transition-transform"
          >
            <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full shadow-lg">
              <span className="text-5xl text-primary">{item.icon}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
