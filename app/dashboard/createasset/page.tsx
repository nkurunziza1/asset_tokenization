"use client";
import { Form } from "@/app/components/form/forms";
import { InputField } from "@/app/components/input/input";
import { AssetSchema } from "@/app/utils/validation";
import { makeAzleActor } from "@/service/actor";
import { _SERVICE as AZLE } from "@/config/declarations/dfx_generated/azle.did";

import React, { useState } from "react";
import Select from "react-select";

type AssetType = {
  assetName: string;
  location: string;
  contacts: string;
  attachmentUrl: string;
  price: string;
  assetId: string;
  securityStatement: string;
  ownershipCertificate: string;
};

const CreateAsset = () => {
  const [loading, setLoading] = useState(false);

  const Category = [
    { value: "land", label: "Land" },
    { value: "house", label: "House" },
    { value: "other", label: "others" },
  ];

  const State = [
    { value: "not for sale", label: "Not for Sale" },
    { value: "for sell", label: "for sell" },
    { value: "portion equit sell", label: "portion equit sell" },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const [selectedState, setSelectedState] = useState<string>("");
  const [stateError, setStateError] = useState<string>("");

  const handleCreateAsset = async (data: AssetType) => {
    console.log("hello world");
    try {
      setLoading(true);
      const azle: AZLE = await makeAzleActor();

      const formData = new FormData();
      formData.append("attachmentURL", data.attachmentUrl);
      formData.append("contact", data.contacts);
      formData.append("securityStatement", data.securityStatement);
      formData.append("isRented", "false");
      formData.append("description", data.assetName);
      formData.append("ownershipCertificate", data.ownershipCertificate);
      formData.append("TradeState", selectedState);
      formData.append("category", selectedCategory);
      formData.append("assetTitle", data.assetName);
      formData.append("price", data.price.toString());
      formData.append("assetIdentity", data.assetId);
      formData.append("location", data.location);

      const assetData = {
        attachmentURL: data.attachmentUrl[0].toString(),
        contact: data.contacts,
        securityStatement: data.securityStatement[0].toString(),
        isRented: false,
        description: data.assetName,
        ownershipCertificate: data.ownershipCertificate[0].toString(),
        TradeState: selectedState,
        category: selectedCategory,
        assetTitle: data.assetName,
        price: data.price,
        assetIdentity: data.assetId,
        location: data.location,
      };
      //@ts-ignore
      await azle.addAsset(assetData);
      console.log("Asset added successfully!");
    } catch (error) {
      console.error("Error adding asset:", error);
    } finally {
      console.log("hello world");
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-10 ">
      <h1
        className="flex justify-between text-xl uppercase "
        style={{
          background:
            "linear-gradient(to bottom left, #e07934, #964680, #4421a0)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        create your asset{" "}
      </h1>
      <p className="text-white p-2">
        After Creating your asset you can start to trade your asset by <br></br>
        selling the token of your asset.
      </p>
      <p></p>
      <Form<AssetType, typeof AssetSchema>
        schema={AssetSchema}
        className="mt-10 ring-1 ring-gray-700 p-10"
        onSubmit={handleCreateAsset}
      >
        {({ register, formState }) => (
          <div>
            <div className="w-full flex flex-col gap-4 justify-center items-center md:flex-row text-left">
              <InputField
                type="text"
                label="Name"
                placeholder="Asset Name "
                registration={register("assetName")}
                error={formState.errors.assetName}
                autoFocus
                className="h-10 text-white rounded-md w-full bg-gray-900   py-2.5 p-10  shadow-sm sm:text-sm "
              />
              <InputField
                type="text"
                label="Location"
                placeholder="Your Asset Location"
                registration={register("location")}
                error={formState.errors.location}
                autoFocus
                className="h-10 rounded-md w-full bg-gray-900   py-2.5 p-10  shadow-sm sm:text-sm"
              />
              <InputField
                type="text"
                label="Telephone"
                placeholder="Your phone number or email  "
                registration={register("contacts")}
                error={formState.errors.contacts}
                autoFocus
                className="h-10 rounded-md w-full bg-gray-900   py-2.5 p-10  shadow-sm sm:text-sm"
              />
            </div>
            <div className="flex flex-col mt-2 md:flex-row gap-4 ">
              <InputField
                type="file"
                label="Image"
                registration={register("attachmentUrl")}
                error={formState.errors.attachmentUrl}
                className="h-10 rounded-md w-full bg-gray-900   py-2.5 p-10  shadow-sm sm:text-sm"
              />
              <InputField
                type="text"
                label="Asset ID"
                placeholder="Asset ID"
                registration={register("assetId")}
                error={formState.errors.assetId}
                className="h-10 rounded-md w-full bg-gray-900   py-2.5 p-10  shadow-sm sm:text-sm"
              />
              <InputField
                type="number"
                label="Price"
                placeholder="Set price of your asset"
                registration={register("price")}
                error={formState.errors.price}
                className="h-10 rounded-md w-full bg-gray-900   py-2.5 p-10  shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <InputField
                type="file"
                label="Security Statement"
                placeholder="Enter your security statement"
                registration={register("securityStatement")}
                error={formState.errors.securityStatement}
                autoFocus
                className="h-10 rounded-md w-full bg-gray-900   py-2.5 p-10  shadow-sm sm:text-sm"
              />
              <InputField
                type="file"
                label="ownershipCertificate"
                placeholder="upload your  ownership certificate"
                registration={register("ownershipCertificate")}
                error={formState.errors.ownershipCertificate}
                autoFocus
                className="h-10 rounded-md w-full bg-gray-900   py-2.5 p-10  shadow-sm sm:text-sm"
              />
            </div>
            <div className="flex w-full mt-2 flex-col md:flex-row gap-4">
              <div className="w-full ">
                <label className="text-white">Trade State</label>
                <Select
                  options={State.map((option) => ({
                    value: option.value,
                    label: option.label,
                  }))}
                  value={
                    selectedState
                      ? {
                          value: selectedState,
                          label: selectedState,
                        }
                      : null
                  }
                  onChange={(selectedOption: any) => {
                    setSelectedState(selectedOption.value);
                    setCategoryError(null);
                  }}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "rgb(17 24 39 / var(--tw-bg-opacity))", 
                      color: "white !important",
                      border: state.isFocused
                        ? "0px solid #4a5568"
                        : "0px solid #4a5568",
                    }),
                    //@ts-ignore
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? "#2d3748" : null,
                      color: "black",
                      cursor: "pointer",
                      transition: "all 0.5s",
                    }),
                  }}
                />
                {stateError && <div className="text-red-500">{stateError}</div>}
              </div>

              <div className="w-full gap-4">
                <label className="text-white">Category</label>
                <Select
                  options={Category.map((option) => ({
                    value: option.value,
                    label: option.label,
                  }))}
                  value={
                    selectedCategory
                      ? {
                          value: selectedCategory,
                          label: selectedCategory,
                        }
                      : null
                  }
                  onChange={(selectedOption: any) => {
                    setSelectedCategory(selectedOption.value);
                    setCategoryError(null);
                  }}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "rgb(17 24 39 / var(--tw-bg-opacity))",
                      color: "white",
                      border: state.isFocused
                        ? "0px solid #4a5568"
                        : "0px solid #4a5568",
                    }),
                    //@ts-ignore
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? "#2d3748" : null, 
                      color: "black",
                      cursor: "pointer",
                      transition: "all 0.5s",
                    }),
                  }}
                />
                {categoryError && (
                  <div className="text-red-500">{categoryError}</div>
                )}
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                disabled={loading}
                className="flex text-sm bg-gray-500 w-[30%]  font-sans font-light items-center justify-center gap-2 bg-second-color text-white p-2 rounded"
              >
                create
              </button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default CreateAsset;
