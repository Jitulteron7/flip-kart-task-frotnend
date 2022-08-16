import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { getDiscount } from '../../utils/functions';
import classes from "./products.module.css"
const Product = ({ _id, desc, img, rating, review, price, originalPrice,assured,offerType,brand }) => {
    // console.log(rating,review,"rating and review");
    let name, images, ratings, numOfReviews, cuttedPrice;
    name = desc;
    images = img;
    ratings = rating;
    numOfReviews = review
    cuttedPrice =originalPrice

    

    return (
        <div  className="flex flex-col items-start gap-2 px-4 py-6 relative hover:shadow-lg rounded-sm">
            {/* <!-- image & product title --> */}
            <Link to={`/product/${_id}`} className="flex flex-col items-center text-center group">
                <div className="w-44 h-60">
                    <img draggable="false" className="w-full h-full object-contain" src={images} alt="" />
                </div>
                <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">{name.length > 85 ? `${name.substring(0, 85)}...` : name}</h2>
                <div style={{display:"flex",width:"100%",margin:"5px 0"}}>
                <h2 className={classes.brand}>{brand}</h2>
                </div>
                
            </Link>
            {/* <!-- image & product title --> */}

            {/* <!-- product description --> */}
            <div className="flex flex-col gap-2 items-start">
                {/* <!-- rating badge --> */}
                <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                    <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">{ratings.toFixed(1)} <StarIcon sx={{ fontSize: "14px" }} /></span>
                    <span>({numOfReviews})</span>
                    {assured?<span><img  style={{height:"20px"}} src={"https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"}/></span>:<></>}
                </span>
                {/* <!-- rating badge --> */}

                {/* <!-- price container --> */}
                <div className="flex items-center gap-1.5 text-md font-medium">
                    <span>₹{price.toLocaleString()}</span>
                    <span className="text-gray-500 line-through text-xs">₹{cuttedPrice.toLocaleString()}</span>
                    <span className="text-xs text-primary-green">{getDiscount(price, cuttedPrice)}%&nbsp;off</span>                    
                </div>
                {(offerType=="Bank Offer"||offerType=="Hot Deal")?<div className="flex items-center gap-1.5 text-md font-medium">
                    <span style={{color: "rgb(38, 165, 65)",fontSize:"14px",fontWeight: "700"}} >{offerType}</span>                    
                </div>:
                (<></>)}
                {/* <!-- price container --> */}
            </div>
            {/* <!-- product description --> */}

            {/* <!-- wishlist badge --> */}
            <span  className={`"hover:text-red-500 text-gray-300"} absolute top-6 right-6 cursor-pointer`}><FavoriteIcon sx={{ fontSize: "18px" }} /></span>
            {/* <!-- wishlist badge --> */}

        </div>
    );
};

export default Product;
