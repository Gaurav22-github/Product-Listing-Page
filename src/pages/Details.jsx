import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Details() {
  const { product_id } = useParams(); // isma name b da skta ha const ka or us ko is prkar b use ma la sakta ha 
  // console.log(product_id);
  const [product, setProducts] = useState(null);
  console.log("products", product);

  const fetchProductss = () => {
    axios.get(`https://dummyjson.com/products/${product_id}`).then(
      (response) => {
        if (response.status == 200) {
          setProducts(response.data)
        }
      }
    ).catch(
      (error) => {
        console.log(error);

      }
    )

  }
  useEffect(
    () => {
      if (product_id != null) {
        fetchProductss();
      }
    }, [product_id]
  )
  return (
    <>
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        {/* Product Image and Main Details */}
        <div className="flex flex-col lg:flex-row">
          {/* Product Image */}
          <div className="lg:w-1/3 flex justify-center mb-6 lg:mb-0">
            <img
              src={product?.thumbnail}
              alt={product?.title}
              className="w-3/4 h-auto rounded-md shadow-md"
            />
          </div>

          {/* Product Info */}
          <div className="lg:w-2/3 lg:ml-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {product?.title}
            </h1>
            <p className="text-sm text-gray-500 mb-1">Category: {product?.category}</p>
            <p className="text-sm text-gray-500 mb-1">Brand: {product?.brand}</p>
            <p className="text-lg text-gray-800 font-semibold mt-4">
              ${product?.price.toFixed(2)}{" "}
              <span className="text-sm text-red-500 line-through">
                ${(product?.price / (1 - product?.discountPercentage / 100)).toFixed(2)}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-2">Discount: {product?.discountPercentage}%</p>
            <p className="text-sm text-gray-700 mt-4">{product?.description}</p>

            {/* Availability and Ratings */}
            <div className="flex items-center mt-4 space-x-4">
              <span className="text-green-500 text-sm font-semibold">{product?.availabilityStatus}</span>
              <span className="text-gray-400 text-sm">|</span>
              <span className="text-yellow-500 text-sm font-semibold">
                Rating: {product?.rating}
              </span>
            </div>

            {/* Additional Information */}
            <div className="mt-4">
              <p className="text-sm text-gray-600">SKU: {product?.sku}</p>
              <p className="text-sm text-gray-600">Weight: {product?.weight} oz</p>
              <p className="text-sm text-gray-600">
                Dimensions: {product?.dimensions.width} x {product?.dimensions.height} x{" "}
                {product?.dimensions.depth} cm
              </p>
              <p className="text-sm text-gray-600">Warranty: {product?.warrantyInformation}</p>
              <p className="text-sm text-gray-600">Shipping: {product?.shippingInformation}</p>
            </div>

            {/* Tags */}
            <div className="mt-4 flex space-x-2">
              <span className="text-xs font-semibold text-gray-500">Tags:</span>
              {product?.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs text-gray-500 bg-gray-200 py-1 px-2 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800">Customer Reviews</h2>
          <div className="mt-4 space-y-4">
            {product?.reviews.map((review, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-md">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    {review.reviewerName}
                  </span>
                  <span className="text-sm text-yellow-500 ml-4">
                    Rating: {review.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Return Policy */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800">Return Policy</h2>
          <p className="text-sm text-gray-600 mt-2">{product?.returnPolicy}</p>
        </div>
      </div>
    </>

  )
}
