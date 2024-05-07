import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import ABI from '../../../rent-safe-backend/artifacts/contracts/PropertyListing.sol/PropertyListing.json';
import { ethers } from 'ethers';

export default function AgreementAdd() {
    const { uid } = useParams();
    const rentalAgreementContract = '0x61528a2598513881673E58dCf5c745429646458B';
    const [formData, setFormData] = useState({
        propertyId: uid,
        rentAmount: "",
        advance: "",
        duration: "",
        landlord_wallet: "",
        tenant_wallet: "",
        extraDetails: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        // Validate required fields except 'extraDetails'
        for (const field in formData) {
            if (field !== 'extraDetails' && !formData[field].trim()) {
                newErrors[field] = 'This field is required';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            toast.error("Please fill in all required fields.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 10000,
            });
            return;
        }

        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(rentalAgreementContract, ABI.abi, signer);
            const transaction = await contract.createAgreement(
                formData.propertyId,
                formData.rentAmount,
                formData.advance,
                formData.duration,
                formData.landlord_wallet,
                formData.tenant_wallet,
                formData.extraDetails,
            );

            await transaction.wait();
            toast.success("Agreement Created Successfully");
        } catch (error) {
            console.error("Error creating Agreement:", error);
            toast.error("Failed to create agreement. Please try again.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 10000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear errors on input change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    return (
        <div className="flex justify-center my-10 items-center h-[100%]">
            <div className="gradient z-0" />
            <div className="max-w-3xl z-10 w-full">
                <form className="bg-white/50 shadow-md px-8 pt-6 pb-8 mb-4 border z-10 border-slate-300 rounded-2xl py-5" onSubmit={handleSubmit}>
                    <h2 className="text-gray-900 text-center text-2xl md:text-3xl mb-5 font-semibold">Fill the Agreement Details</h2>
                    {Object.keys(formData).map((field, index) => (
                        <div className="mb-4" key={index}>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                <input
                                    type={field.includes('amount') || field === 'advance' || field === 'rentAmount' || field === 'duration'? 'number' : 'text'}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleInputChange}
                                    className={`shadow appearance-none border ${errors[field] ? 'border-red-500' : 'rounded'} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                    placeholder={`Enter ${field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`}
                                    disabled={field === 'propertyId'}
                                />
                                {errors[field] && <p className="text-red-500 text-xs italic">{errors[field]}</p>}
                            </label>
                        </div>
                    ))}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Agreement'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
