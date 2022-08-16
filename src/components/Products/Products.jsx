import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import Radio from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProducts } from '../../actions/productAction';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import Product from './Product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StarIcon from '@mui/icons-material/Star';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';
import { getRandomProducts } from '../../utils/functions';
import { useLocation } from 'react-router-dom';
import classes from "./products.module.css";

const Products = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const location = useLocation();
    // let [sortBy,setRelevence] = useState("relevance");
    let [brands,setBrands] = useState([]);
    let [offers,setOffers] = useState([]);    
    let [price, setPrice] = useState([0, 200000]);
    let [category, setCategory] = useState(location.search ? location.search.split("=")[1] : "");
    let [ratings, setRatings] = useState([]);
    let [focus, setFocus] = useState(false);
    let [sortIt,setSortIt] = useState("popularity")
    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    // filter toggles
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [ratingsToggle, setRatingsToggle] = useState(true);
    const [brandToggle, setBrandToggle] = useState(true);
    const [offerToggle, setOfferToggle] = useState(true);
    const [discountToggle, setdiscountToggle] = useState(true);
    const [aviaToggle, setdaviaToggle] = useState(true);

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
    const keyword = params.keyword;

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    }

    const clearFilters = () => {
        setPrice([0, 200000]);
        setCategory("");
        setRatings(0);
    }
    console.log(resultPerPage, filteredProductsCount,"products")
    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }

          
        dispatch(getProducts(category,sortIt,brands,offers, price, ratings, currentPage));
        // console.log(brands,offers,ratings,"brands useeffect");
    }, [dispatch,category,sortIt,brands,offers, price, ratings, currentPage, error, enqueueSnackbar]);

    return (
        <>
            <MetaData title="All Products | Flipkart" />

            <MinCategory />
            <main style={{padding:"0 20px"}} className="w-full mt-14 sm:mt-0">

                {/* <!-- row --> */}
                <div className="flex gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto mb-7">

                    {/* <!-- sidebar column  --> */}
                    <div className="hidden sm:flex flex-col w-1/5 px-1">

                        {/* <!-- nav tiles --> */}
                        <div className="flex flex-col bg-white rounded-sm shadow">

                            {/* <!-- filters header --> */}
                            <div className="flex items-center justify-between gap-5 px-2 py-2 border-b">
                                <p className="text-lg font-medium">Filters</p>                                
                            </div>

                            <div className="flex flex-col gap-2 py-3 text-sm overflow-hidden">

                                {/* price slider filter */}
                                {/* <div className="flex flex-col gap-2 border-b px-4">
                                    <span className="font-medium text-xs">PRICE</span>

                                    <Slider
                                        value={price}
                                        onChange={priceHandler}
                                        valueLabelDisplay="auto"
                                        getAriaLabel={() => 'Price range slider'}
                                        min={0}
                                        max={200000}
                                    />

                                    <div className="flex gap-3 items-center justify-between mb-2 min-w-full">
                                        <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">₹{price[0].toLocaleString()}</span>
                                        <span className="font-medium text-gray-400">to</span>
                                        <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">₹{price[1].toLocaleString()}</span>
                                    </div>
                                </div> */}
                                {/* price slider filter */}

                                {/* category filter */}
                                <div className="flex flex-col border-b px-4">

                                    <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setCategoryToggle(!categoryToggle)}>
                                        <p className="font-medium text-xs uppercase">Category</p>
                                        {categoryToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>

                                    {categoryToggle && (
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="category-radio-buttons-group"
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    name="category-radio-buttons"
                                                    value={category}
                                                >
                                                    {categories.map((el, i) => (
                                                        <FormControlLabel value={el} control={<Radio size="small" />} label={<span className="text-sm" key={i}>{el}</span>} />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}

                                </div>
                                {/* category filter */}
                                 {/* assured filter */}
                                <div className="flex flex-col border-b px-4">                                    
                                    
                                    
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="ratings-radio-buttons-group"
                                                    onChange={(e) => setRatings(e.target.value)}
                                                    value={ratings}
                                                    name="ratings-radio-buttons"
                                                >
                                                   <FormControlLabel value={10} key={0} control={<Radio size="small" />} label={<span className="flex items-center text-sm"><img style={{height:"21px"}} src ={"https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"}/> </span>} />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    

                                </div>
                                {/* assured filter */}

                                {/* brand filter */}
                                <div className="flex flex-col border-b px-4">

                                    <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setBrandToggle(!brandToggle)}>
                                        <p className="font-medium text-xs uppercase">brand</p>
                                        {brandToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>

                                    {brandToggle && (
                                        <div className="flex flex-col pb-1">
                                        <div  onFocusCapture={()=>{setFocus(true)}} className={focus?classes.searchBoxFocus:classes.searchBox}>
                                            <SearchIcon sx={{ fontSize: "15px", mr: .5 }}/>
                                            <input  className={classes.searchBrand}  placeholder={"Search Brand"} type="search"/>
                                        </div>                                        
                                        
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="ratings-radio-buttons-group"
                                                    role="group"
                                                    onChange={(e) => {                                                                                                                        
                                                        if(brands.includes(e.target.value)){
                                                            brands = brands.filter(function(item) {
                                                            return item !== e.target.value
                                                        })
                                                        }else{
                                                            brands.push(e.target.value)
                                                        }                                                        
                                                        setBrands([...brands])
                                                        }}
                                                    value={brands}
                                                    name="ratings-radio-buttons"
                                                >
                                                    {['HP', 'RRHR', 'MSI', 'BUY', 'Lenovo', 'Oxhox', 'ZEBRONICS',
       'realme', 'Vero', 'ASUS', 'RPM', 'Filiz', 'Wings', 'Meetion',
       'Flipkart', 'EDNITA', 'SpinBot', 'acer', 'Eunoia', 'MJ', 'RAJ',
       'PORTLIX', 'Redgear', 'M', 'STC', 'Smily', 'Huayue', 'AMKETTE',
       'HRRH', 'DELL', 'NEFI', 'menaso', 'Logitech', 'TEWENT', 'WHISTLE9',
       'Cosmic', 'VEROX', 'Prifakt', 'AKM', 'HyperX', 'Lieven', 'rich',
       'FKU', 'LUTENET', 'Ruhi', 'P', 'PRODOT', 'Ant', 'Razer', 'SARASI',
       'Aced', 'Sanctuary', 'WILDBRAIN', 'ankSONline', 'GAMDIAS',
       'VIBOTON', 'ANY', 'Buy', 'CORSAIR', 'SACRIS', 'PEARIVE', 'Intex',
       'accessoo', 'icall', 'Worricow', 'Viraan', 'DENISIGA', 'ZURU',
       'MOBIKAMA'].map((el, i) => (
                                                        <FormControlLabel value={el} key={i} control={<Radio size="small" />} label={<span className="flex items-center text-sm">{el}</span>} />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}

                                </div>
                                {/* brand filter */}

                                {/* customer Rating filter */}
                                <div className="flex flex-col border-b px-4">

                                    <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setRatingsToggle(!ratingsToggle)}>
                                        <p className="font-medium text-xs uppercase">customer Rating</p>
                                        {ratingsToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>

                                    {ratingsToggle && (
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="ratings-radio-buttons-group"
                                                    onChange={(e) => {                                                                                                                        
                                                        if(ratings.includes(e.target.value)){
                                                            ratings = ratings.filter(function(item) {
                                                            return item !== e.target.value
                                                        })
                                                        }else{
                                                            ratings.push(e.target.value)
                                                        }                                                        
                                                        setRatings([...ratings])
                                                        }}
                                                    value={ratings}
                                                    name="ratings-radio-buttons"
                                                >
                                                    {[4, 3].map((el, i) => (
                                                        <FormControlLabel value={el} key={i} control={<Radio size="small" />} label={<span className="flex items-center text-sm">{el}<StarIcon sx={{ fontSize: "12px", mr: 0.5 }} /> & above</span>} />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}

                                </div>
                                {/* customer Rating filter */}


                                
                                {/* OFFERS filter */}
                                <div className="flex flex-col border-b px-4">

                                    <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setOfferToggle(!offerToggle)}>
                                        <p className="font-medium text-xs uppercase">OFFERS</p>
                                        {offerToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>

                                    {offerToggle && (
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="ratings-radio-buttons-group"
                                                    onChange={(e) => setRatings(e.target.value)}
                                                    value={ratings}
                                                    name="ratings-radio-buttons"
                                                >
                                                    {["Buy More, Save More", "No Cost EMI", "Special Price"].map((el, i) => {                                                        
                                                      return  <FormControlLabel value={el} key={i} control={<Radio size="small" />} label={<span className="flex items-center text-sm">{el}</span>} />
                                                    })}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}

                                </div>
                                {/* OFFERS filter */}





                                {/* discount filter */}
                                <div className="flex flex-col border-b px-4">

                                    <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setdiscountToggle(!discountToggle)}>
                                        <p className="font-medium text-xs uppercase">Discount</p>
                                        {discountToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>

                                    {discountToggle && (
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="ratings-radio-buttons-group"
                                                    onChange={(e) => {                                                                                                                        
                                                        if(offers.includes(e.target.value)){
                                                            offers = offers.filter(function(item) {
                                                            return item !== e.target.value
                                                        })
                                                        }else{
                                                            offers.push(e.target.value)
                                                        }                                                        
                                                        setOffers([...offers])
                                                        }}
                                                    value={offers}
                                                    name="ratings-radio-buttons"
                                                >
                                                    {[50, 40, 30, 20, 10, 9].map((el, i) => {
                                                        if(el == 9){
                                                            return <FormControlLabel value={10} key={i} control={<Radio size="small" />} label={<span className="flex items-center text-sm">{10}% and  below</span>} />
                                                        }
                                                      return  <FormControlLabel value={el} key={i} control={<Radio size="small" />} label={<span className="flex items-center text-sm">{el}% or  above</span>} />
                                                    })}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}

                                </div>
                                {/* disount filter */}


                                {/* OFFERS filter */}
                                <div className="flex flex-col border-b px-4">

                                    <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setdaviaToggle(!aviaToggle)}>
                                        <p className="font-medium text-xs uppercase">Aviability</p>
                                        {aviaToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>

                                    {aviaToggle && (
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="ratings-radio-buttons-group"
                                                    onChange={(e) => setRatings(e.target.value)}
                                                    value={ratings}
                                                    name="ratings-radio-buttons"
                                                >
                                                    {["Include Out of Stocks"].map((el, i) => {                                                        
                                                      return  <FormControlLabel value={el} key={i} control={<Radio size="small" />} label={<span className="flex items-center text-sm">{el}</span>} />
                                                    })}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}

                                </div>
                                {/* OFFERS filter */}
                                

                            </div>

                        </div>
                        {/* <!-- nav tiles --> */}

                    </div>
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- search column --> */}
                    <div className="flex-1">

                        {!loading && products?.length === 0 && (
                            <div className="flex flex-col items-center justify-center gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16">
                                Product not found
                            </div>
                        )}

                        {loading ? <Loader /> : (
                            <div className="flex flex-col gap-2  justify-center items-center w-full overflow-hidden bg-white">
                                <div style={{padding:"12px 16px 0"}} className="grid grid-cols-1  w-full place-content-start overflow-hidden ">
                                    <div className={classes.sortSectionTitle}>
                                        <h3>Gaming</h3>
                                        <p>(showing 1 - 40 products of 200 products)</p>
                                    </div>

                                    <div className={classes.sortSectionOptions}>
                                        <span>Sort By</span>
                                        <div
                                         onClick={()=>{
                                            setSortIt("popularity")
                                         }}
                                         className={sortIt=="popularity"?classes.sortIt:''}>Popularity</div>
                                        <div 
                                        onClick={()=>{
                                            setSortIt("priceLH")
                                         }}
                                        className={sortIt=="priceLH"?classes.sortIt:''}>Price--Low to High</div>
                                        <div
                                        onClick={()=>{
                                            setSortIt("priceHL")
                                         }}
                                         className={sortIt=="priceHL"?classes.sortIt:''}>Price--High to Low</div>
                                        <div
                                        onClick={()=>{
                                            setSortIt("newest")
                                         }}
                                         className={sortIt=="newest"?classes.sortIt:''}>Newest First</div>                                        
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 w-full place-content-start overflow-hidden pb-4 border-b">
                                    {products?.map((product) => (
                                            <Product {...product} key={product._id} />
                                        ))
                                    }
                                </div>
                                {filteredProductsCount >= resultPerPage && (
                                    <Pagination
                                        count={Number(((productsCount) / resultPerPage).toFixed())}
                                        page={currentPage}
                                        onChange={(e, val) => setCurrentPage(val)}
                                        color="primary"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    {/* <!-- search column --> */}
                </div >
                {/* <!-- row --> */}

            </main >
        </>
    );
};

export default Products;
