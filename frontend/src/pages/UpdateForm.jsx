import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Upload } from 'lucide-react';
import axios from 'axios';
function UpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rating: 0,
    discountedPrice: 0,
    originalPrice: 0,
    quantity: 0,
    category: '',
  });
  const [errorInput, setInputError] = useState('');
  const [Images, setImages] = useState();

  const handleImageUpload = (e) => {
    const ImagesArray = Array.from(e.target.files);
    console.log(ImagesArray);
    setImages(ImagesArray);
  };
  const handleChange = (e) => {
    setInputError('');
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(Images);
    const {
      title,
      description,
      rating,
      discountedPrice,
      originalPrice,
      quantity,
      category,
    } = formData;
    if (
      title.length <= 0 ||
      description.length <= 0 ||
      discountedPrice <= 0 ||
      originalPrice <= 0 ||
      quantity <= 0 ||
      category.length <= 0
    ) {
      return setInputError('Enter The Information Inside Feilds Correctly...');
    }
    let formDataBody = new FormData();
    formDataBody.append('title', title);
    formDataBody.append('description', description);
    formDataBody.append('category', category);
    formDataBody.append('discountedPrice', discountedPrice);
    formDataBody.append('originalPrice', originalPrice);
    formDataBody.append('quantity', quantity);
    formDataBody.append('rating', rating);
    console.log(Images);
    if (Images) {
      Images?.map((ele) => {
        formDataBody.append('files', ele);
      });
    } else {
      formData.images?.forEach((url) => formDataBody.append('images', url));
    }

    console.log('formDataBody', formDataBody);
    console.log('Images', Images);
    console.log('formData.images', formData);
    // axios request post
    let requestdata = await axios
      .put(
        `http://localhost:8080/product/update-products/${id}`,
        formDataBody,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate('/');
        return res;
      })
      .catch((er) => {
        console.log('error', er);
        setInputError(er.response?.data?.message || er.message);
        return er;
      });

    for (let pair of formDataBody.entries()) {
      if (pair[1] instanceof File) {
        console.log(
          `${pair[0]}: File - ${pair[1].name}, ${pair[1].type}, ${pair[1].size} bytes`
        );
      } else {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }
  };

  useEffect(() => {
    const getDataForId = async () => {
      const singleData = await axios.get(
        `http://localhost:8080/product/get-single/${id}`
      );
      console.log(singleData);
      setFormData(singleData.data.data);
      console.log('Images', Images);
    };

    getDataForId();
  }, [id]);
  const inputClass =
    'mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600';
  const labelClass = 'block text-sm font-medium text-gray-700';

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Update Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.title}
              name="title"
              placeholder="Enter product title"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={formData.description}
              placeholder="Enter description"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Discounted Price</label>
              <input
                type="number"
                name="discountedPrice"
                onChange={handleChange}
                value={formData.discountedPrice}
                placeholder="Discounted price"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Original Price</label>
              <input
                type="number"
                onChange={handleChange}
                name="originalPrice"
                value={formData.originalPrice}
                placeholder="Original price"
                className={inputClass}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Stock Quantity</label>
              <input
                type="number"
                onChange={handleChange}
                value={formData.quantity}
                name="quantity"
                placeholder="Stock quantity"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Rating</label>
              <input
                value={formData.rating}
                name="rating"
                type="number"
                onChange={handleChange}
                placeholder="Rating"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select
              onChange={handleChange}
              value={formData.category}
              name="category"
              className={inputClass}
            >
              <option value="">Select category</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Product Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white file:text-sm file:font-medium hover:file:bg-blue-700"
            />
          </div>
          {errorInput && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {errorInput}
            </p>
          )}
          <button
            type="Submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;
