"use client";
import { Form } from "@/app/components/form/forms";
import { InputField } from "@/app/components/input/input";
import { AssetSchema } from "@/app/utils/validation";
import React, { useState } from "react";
import Select from "react-select";


type AssetType = {
  assetName: string;
  location: string;
  contacts: string;
  image: string;
  attachments: string;
  assetId: string;
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

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [stateError, setStateError] = useState<string | null>(null);

  const handleCreateAsset = () => {};
  return (
    <div className="bg-gray-800 p-10  ">
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
        After Creating your asset you can start to trade your asset by <br></br>selling
        the token of your asset.
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
                type="text"
                label="Image"
                placeholder="image url"
                registration={register("image")}
                error={formState.errors.image}
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
                      backgroundColor: "rgb(17 24 39 / var(--tw-bg-opacity))", // Set the background color here
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
                      backgroundColor: state.isFocused ? "#2d3748" : null, // Set the background color of the options when focused
                      color: "black",
                      cursor: "pointer",
                      transition: "all 0.5s", // Set the text color of the options
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
