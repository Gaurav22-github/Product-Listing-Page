import React, { useContext, useEffect, useState } from 'react'
import Container from '../components/Container'
import axios from 'axios';
import { data } from 'autoprefixer';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { CiGrid41 } from "react-icons/ci";
import { FaList } from "react-icons/fa";
import { Context } from "../context/Main";

export default function Home() {
    const [categries, setCategries] = useState([]);
    const [total_products, setTotalProducts] = useState(0);
    const [products, setProducts] = useState([]);


    const [listingmode, setListing] = useState(0);
    const { category_slug } = useParams();
    const [page, setPage] = useState(0);
    const [searchQuery, setSearchQuery] = useSearchParams();
    // {is ma two item hota ha holder , modifier} 


    const limit = 20;
    useEffect(
        () => {
            fetchcategries();
            const search_page = searchQuery.get('page');
            if (search_page != null) {
                setPage(Number(search_page));
            }
        }, []
    )

    const fetchcategries = () => {
        axios.get("https://dummyjson.com/products/categories").then( //fulleyfilled
            (response) => {
                if (response.status == 200) {
                    setCategries(response.data)
                }
            }
        ).catch(//rejected
            (error) => {
                console.log(error);
            }
        )
    }
    const fetchproducts = () => {

        // console.log(page_number); 
        const skip = (Number(searchQuery.get('page')) ?? page) * limit;
        let API = "https://dummyjson.com/products";
        if (category_slug != undefined) {
            API += `/category/${category_slug}`;
        } else {
            API += `?limit=${limit}&skip=${skip}`;
        }
        // console.log(API);

        axios.get(API).then( //fulleyfilled
            (response) => {
                if (response.status == 200) {
                    setProducts(response.data.products)
                    setTotalProducts(response.data.total);
                    console.log(products);
                }
            }
        ).catch(//rejected
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(
        () => {
            fetchproducts();
        }, [category_slug, page] // first render and on change categry slug
    )

    const pageChangeHandler = (page_number) => {
        setSearchQuery({ page: page_number })
        setPage(page_number)
    }

    return (
        <Container>
            <div className='grid grid-cols-4 gap-2'>
                <div className=' '>
                    <div className=' text-lg text-center mb-2 p-3 bg-[gray] text-white'>
                        Categries
                    </div>
                    <CategriesListing category_slug={category_slug} data={categries} />
                </div>
                <div className='col-span-3'>
                    <Pagination currentPage={page} pageChangeHandler={pageChangeHandler}
                        limit={limit} total_records={total_products} />
                    <div className=' text-lg text-center p-3 mb-2 bg-[gray] text-white flex justify-end gap-3'>
                        <CiGrid41 className={`${listingmode == 0 && "text-[gold]"}`} onClick={() => setListing(0)} />
                        <FaList className={`${listingmode == 1 && "text-[gold]"}`} onClick={() => setListing(1)} />
                    </div>
                    <Productlisting listingmode={listingmode} data={products} />
                </div>
            </div>
        </Container>
    )
}
const CategriesListing = ({ data, category_slug }) => {
    return (
        <ul>
            <li className={`border p-2 ${category_slug == undefined && 'bg-[blue] text-white'}`}><Link to={"/"} >All</Link></li>
            {
                data.map(
                    (item, index) => {
                        return (
                            <li className={`${category_slug == item.slug && "bg-[blue] text-white"} border p-2`}
                                key={index}><Link to={`/${item.slug}`} >{item.name}</Link></li>
                        )
                    }
                )
            }
        </ul>
    )
}
const Productlisting = ({ data, listingmode }) => {
    const {addToCart} = useContext(Context);
    return (
        <div className={`grid ${listingmode == 0 ? 'grid-cols-3' : 'grid-cols-1'} gap-2 p-3`}>
            {
                data.map(
                    (prod) => {
                        return (
                            <div key={prod.id} className={`border p-3 rounded group ${listingmode === 'list' ? 'flex items-center' : ''}`}>
                                <div
                                    className={`aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none 
                ${listingmode === 'grid' ? 'lg:h-80' : 'h-40 w-40 flex-shrink-0'}`}>
                                    <Link to={`/product-details/${prod.id}`}>
                                        <img
                                            src={prod.thumbnail}
                                            alt={`Front of ${prod.title}`}
                                            className="h-full w-full object-cover object-center" />
                                    </Link>
                                </div>
                                <div className={`mt-4 ${listingmode === 'list' ? 'ml-4' : ''} flex flex-col justify-between`}>
                                    <h3 className="text-sm text-gray-700">
                                        <Link to={`/product-details/${prod.id}`}>
                                            <span aria-hidden="true" className="" />
                                            {prod.title}
                                        </Link>
                                    </h3>
                                    {
                                        listingmode == 1 && <p>{prod.description}</p>
                                    }
                                    <p className="text-sm text-gray-500">{prod.brand}</p>
                                    <p className="text-sm font-medium text-gray-900">$ {prod.price}</p>
                                    <p><button onClick={() => addToCart(prod.id)} className='rounded hover:bg-[blue] hover:text-white my-2 p-1 border'>Cart +</button></p>
                                    {
                                        listingmode == 1 && <p>{prod.availabilityStatus}</p>
                                    }
                                </div>
                            </div>
                        )
                    })}
        </div>
    )
}

const Pagination = ({ currentPage, pageChangeHandler, total_records, limit }) => {
    const totalPages = Math.ceil(total_records / limit);
    // console.log("totalPages", totalPages)
    const pageElem = [];

    if (isNaN(totalPages) == false) {
        for (let i = 0; i < totalPages; i++) {
            pageElem.push(<li key={i}>

                <span
                    onClick={() => pageChangeHandler(i)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500
                         bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                         ${i == currentPage && '!bg-[blue] text-white'} `}
                >
                    {i + 1}
                </span>

            </li>
            )
        }
    }

    return (
        <>
            <nav aria-label="Page navigation example" className='my-4'>
                <ul className="inline-flex -space-x-px text-sm cursor-pointer">
                    <li>
                        < span style={{ pointerEvents: currentPage == 0 && 'none' }}
                            onClick={() => pageChangeHandler(currentPage - 1)}
                            className=" cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Previous
                        </span>
                    </li>
                    {pageElem}
                    <li>

                        < span style={{ pointerEvents: currentPage == totalPages - 1 && 'none' }}
                            onClick={() => { pageChangeHandler(currentPage + 1) }}
                            className=" cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Next
                        </span>
                    </li>
                </ul>
            </nav>

        </>

    )
}