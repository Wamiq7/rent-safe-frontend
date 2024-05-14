import React, { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RxAvatar } from 'react-icons/rx';
import ABI from '../../src/contracts/PropertyListing.sol/PropertyListing.json'

import { ethers } from 'ethers';

export default function PropertyAdd() {
  const propertyListingAddress = import.meta.env.VITE_PROPERTY;
  const [formData, setFormData] = useState({
    address: "",
    description: "",
    city: "",
    floor: "",
    owner_wallet: "",
    imageLinks: [],
    type: "",
    rentAmount: "",
    thumbnail: ""
  });
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hiddenFileInput = useRef(null);
  const hiddenThumbnailInput = useRef(null);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
    setErrors({ ...errors, images: null });
  };

  const handleThumbnailClick = () => {
    hiddenThumbnailInput.current.click();
  };

  const handleThumbnailChange = async (event) => {
    const file = event.target.files[0];
    setThumbnail(file);


    const thumbnailHash = await uploadThumbnailToPinata(file);
    if (thumbnailHash) {
      setFormData({ ...formData, thumbnail: thumbnailHash });
      // console.log("Thumbnail hash in formData:", thumbnailHash); 
    }
  };

  const uploadThumbnailToPinata = async (file) => {
    const fileData = new FormData();
    fileData.append("file", file);

    try {
      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.IpfsHash;
    } catch (error) {
      console.error("Error uploading thumbnail image to Pinata:", error);
      toast.error("Error uploading thumbnail image to IPFS.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 10000,
      });
      return null;
    }
  };

  const uploadToPinata = async (files) => {
    return Promise.all(files.map(async (file) => {
      const fileData = new FormData();
      fileData.append("file", file);
      try {
        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: fileData,
          headers: {
            pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data.IpfsHash;
      } catch (error) {
        console.error("Error uploading image to Pinata:", error);
        toast.error("Error uploading image to IPFS.", {
          position: toast.POSITION.TOP_CENTER, autoClose: 10000,
        });
        return null;
      }
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    const fields = ['address', 'city', 'floor', 'owner_wallet', 'type', 'rentAmount', 'thumbnail', 'description'];
    fields.forEach(field => {
      if (!formData[field]) {
        isValid = false;
        newErrors[field] = `The ${field.replace('_', ' ')} is required.`;
      }
    });

    if (images.length === 0) {
      isValid = false;
      newErrors.images = "At least one image is required.";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const ipfsHashes = await uploadToPinata(images);
    if (!ipfsHashes || ipfsHashes.includes(null)) {
      setIsSubmitting(false);
      return;
    }

    setFormData({ ...formData, imageLinks: ipfsHashes });
    console.log("Successfully uploaded images to IPFS with hashes:", ipfsHashes);
    console.log(formData);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(propertyListingAddress, ABI.abi, signer);
      console.log(contract);
      const transaction = await contract.listProperty(
        formData.address,
        formData.city,
        formData.floor,
        formData.owner_wallet,
        formData.description,
        ipfsHashes,
        formData.type,
        formData.rentAmount,
        formData.thumbnail
      );

      const receipt = await transaction.wait();
      console.log("Property listed!", receipt);
      toast.success("Property Listed Successfully");
    } catch (error) {
      console.error("Error listing property:", error);
      toast.error("Error listing property.", {
        position: toast.POSITION.TOP_CENTER, autoClose: 10000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  return (
    <div className="flex justify-center my-10 items-center h-screen">
      <div className="gradient z-0" />
      <div className="max-w-3xl z-10 w-full">
        <form className="bg-white/50 shadow-md px-8 pt-6 pb-8 mb-4 border z-10 border-slate-300 rounded-2xl py-5" onSubmit={handleSubmit}>
          <h2 className="text-gray-900 text-center text-2xl md:text-3xl mb-5 font-semibold">Enter Property Details</h2>

          {['address', 'city', 'floor', 'owner_wallet', 'description', 'type', 'rentAmount'].map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                <input
                  type={field === 'description' ? 'textarea' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={(e) => {
                    setFormData({ ...formData, [field]: e.target.value });
                    setErrors({ ...errors, [field]: null });
                  }}
                  className={`shadow appearance-none border ${errors[field] ? 'border-red-500' : 'rounded'} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                />
                {errors[field] && <p className="text-red-500 text-xs italic">{errors[field]}</p>}
              </label>
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Choose Thumbnail
              <div onClick={handleThumbnailClick} style={{ cursor: 'pointer' }} className="box-decoration w-full py-6 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center">
                <p className="text-gray-700">{thumbnail ? thumbnail.name : 'Choose an image'}</p>
                <input
                  id="thumbnail-upload-input"
                  type="file"
                  onChange={handleThumbnailChange}
                  ref={hiddenThumbnailInput}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
              </div>
            </label>
          </div>



          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Choose images
              <div onClick={handleClick} style={{ cursor: 'pointer' }} className="box-decoration w-full py-6">
                {images.length > 0 ? (
                  images.map((image, index) => (
                    <img key={index} src={URL.createObjectURL(image)} alt={`Upload Preview ${index}`} className="aspect-video md:w-full h-40 object-cover rounded-lg mb-2" />
                  ))
                ) : (
                  <RxAvatar className="w-40 h-40 text-accent" />
                )}
                <input
                  id="image-upload-input"
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  ref={hiddenFileInput}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
              </div>
              {errors.images && <p className="text-red-500 text-xs italic">{errors.images}</p>}
            </label>
          </div>

          <div className="flex items-center justify-between glass">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white bg-accent hover:bg-accent/75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isSubmitting ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? "Listing..." : "List Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
