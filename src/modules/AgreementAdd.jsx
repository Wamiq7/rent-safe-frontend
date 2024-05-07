import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import ABI from '../../../rent-safe-backend/artifacts/contracts/PropertyListing.sol/PropertyListing.json'


export default function AgreementAdd() {
    const { uid } = useParams();
    const rentalAgreementContract = '0x61528a2598513881673E58dCf5c745429646458B'
    const [formData, setFormData] = useState({
        propertyId: uid,
        rentAmount: "",
        advance: "",
        duration: "",
        landlord_wallet: "",
        tenant_wallet: "",
        extraDetails: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const requiredFields = ['rentAmount'];
        // return those fields from formData which are empty.
        const emptyFields = requiredFields.filter((field) => !formData[field]);
        if (emptyFields.length > 0) {
            // map through each item and make a new array
            const emptyFieldNames = emptyFields.map((field) => field.charAt(0).toUpperCase() + field.slice(1));

            const errorMessage = `Please fill in the following required fields: ${emptyFieldNames.join(', ')}`;
            toast.error(`${errorMessage}`, {
                position: toast.POSITION.TOP_CENTER, autoClose: 10000,
            });
            // setShowModal(!showModal);
            return;
        }

        if (isSubmitting) {
            return; // Prevent submitting multiple times while the request is being made
        }

        setIsSubmitting(true); // Disable the button

        const bodyData = new FormData();
        bodyData.append('propertyId', formData.propertyId)
        bodyData.append('rentAmount', formData.rentAmount);
        bodyData.append('description', formData.description);
        bodyData.append('propertyStateAgent', formData.propertyStateAgent);
        if (formData.advance) {
            bodyData.append('advance', formData.advance);
        }
        if (formData.advance) {
            bodyData.append('duration', formData.duration);
        }
        if (formData.landlord_wallet) {
            bodyData.append('landlord_wallet', formData.landlord_wallet);
        }

        if (formData.tenant_wallet) {
            bodyData.append('tenant_wallet', formData.tenant_wallet);
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(rentalAgreementContract, ABI.abi, signer);

            const transaction = await contract.createAgreement(
                formData.propertyId,
                formData.rentAmount,
                formData.advance,
                formData.duration,
                formData.landlord_wallet,
                formData.tenant_wallet,
                formData.extraDetails,
            )

            const receipt = await transaction.wait();
            console.log("Agreement Created", receipt);
            toast.success("Agreement Created Successfully")
        }
        catch (error) {
            console.error("Error creating Agreement:", error);
        }

    };

    return (
        <div className="flex justify-center my-10 items-center h-[100%]">
            <div className="gradient z-0" />
            <div className="max-w-3xl z-10 w-full">
                <form
                    className="bg-white/50 shadow-md px-8 pt-6 pb-8 mb-4 border z-10 border-slate-300 rounded-2xl py-5"
                >
                    <h2
                        className="text-gray-900 text-center text-2xl md:text-3xl mb-5 font-semibold"
                    >
                        Fill the Agreement Details
                    </h2>
                    <div className="mb-4">
                        <label
                            htmlFor="rentAmount"
                            className="block text-gray-700 stext-sm font-bold mb-2"
                        >
                            Property Id
                            <input
                                name="propertyId"
                                id="propertyId"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={uid}
                                disabled
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="rentAmount"
                            className="block text-gray-700 stext-sm font-bold mb-2"
                        >
                            Rent Amount
                            <input
                                type="number"
                                name="adress"
                                value={formData.rentAmount}
                                onChange={(e) => setFormData({ ...formData, rentAmount: e.target.value })}
                                id="rentAmount"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter Property Rent"
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="advance"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Advance
                            <input
                                type="number"
                                name="advance"
                                id="advance"
                                value={formData.advance}
                                onChange={(e) => setFormData({ ...formData, advance: e.target.value })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter Advance decided for security"
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="duration"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Agreement Duration
                            <input
                                type="text"
                                name="duration"
                                id="duration"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter duration in months like 12,16,etc"
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="Floor"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Landlord Wallet Address
                            <input
                                type="text"
                                name="landlord_wallet"
                                id="landlord_wallet"
                                value={formData.landlord_wallet}
                                onChange={(e) => setFormData({ ...formData, landlord_wallet: e.target.value })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Ground,first,Second..etc"
                            />
                        </label>
                    </div>


                    <div className="mb-4">
                        <label
                            htmlFor="tenant_wallet"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Tenant Wallet Address
                            <input
                                type="text"
                                name="tenant_wallet"
                                id="tenant_wallet"
                                value={formData.tenant_wallet}
                                onChange={(e) => setFormData({ ...formData, tenant_wallet: e.target.value })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Copy the tenant wallet rentAmount here"
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Extra Details (if any)
                            <textarea
                                id="description"
                                name="description"
                                value={formData.extraDetails}
                                onChange={(e) => setFormData({ ...formData, extraDetails: e.target.value })}
                                rows="3"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Demands from the sides of Tenanat or Requiements of owner"
                            />
                        </label>
                    </div>

                    <div className="flex items-center justify-between glass">
                        <button
                            type="submit"
                            className={`w-full text-white bg-accent hover:bg-accent/75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isSubmitting ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : ''}`}
                            onClick={(e) => handleSubmit(e)}
                            disabled={isSubmitting} // Disable the button while submitting
                        >
                            {isSubmitting ? "Creating...." : "Create Agreement"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
