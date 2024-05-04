import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxAvatar } from 'react-icons/rx';

export default function PropertyAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    description: "",
    city: "",
    area: "",
    floor: "",
    owner_wallet: "",
    tenant_wallet: "",
    open: false,
    propertyStateAgent: localStorage.getItem("isOrg")
  });
  const [images, setImages] = useState([]);  // Changed to handle multiple images
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);  // Now storing an array of files
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (images.length > 0) {
      const ipfsHashes = await uploadToPinata(images);
      console.log("Successfully uploaded images to IPFS with hashes:", ipfsHashes);
    }
    setIsSubmitting(false);
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
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Complete Property Address
              <input type="text" name="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City
              <input type="text" name="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Area
              <input type="text" name="area" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Floor
              <input type="text" name="floor" value={formData.floor} onChange={(e) => setFormData({ ...formData, floor: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Owner Wallet Address
              <input type="text" name="owner_wallet" value={formData.owner_wallet} onChange={(e) => setFormData({ ...formData, owner_wallet: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tenant Wallet Address
              <input type="text" name="tenant_wallet" value={formData.tenant_wallet} onChange={(e) => setFormData({ ...formData, tenant_wallet: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Property Description
              <textarea id="description" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label>

            {/* Multiple Image Input */}
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
            </label>
          </div>
          </div>

          <div className="flex items-center justify-between glass">
            <button
              type="submit"
              className={`w-full text-white bg-accent hover:bg-accent/75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isSubmitting ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Listing..." : "List Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
