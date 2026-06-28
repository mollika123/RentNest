"use client";

import React, { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Select,
    ListBox,
    Button
} from "@heroui/react";
import { House, Pin, CircleDollar, SquareHashtag, LayoutRows, ListUl, Picture } from "@gravity-ui/icons";
import { createProperty } from "@/lib/actions/property";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function AddProperty() {
    const router = useRouter();
     const [propertyType, setPropertyType] = useState("");
    const [rentType, setRentType] = useState("");
    const [errors, setErrors] = useState({});
 const { data: session, isPending } = useSession();
console.log("SESSION:", session);
if (isPending) {
  return <p>Loading...</p>;
}

const user = session?.user;
    // সিলেক্টেড স্টেট ম্যানেজমেন্ট
   

    const amenitiesOptions = [
        { label: "WiFi", value: "wifi" },
        { label: "Parking", value: "parking" },
        { label: "Air Conditioning", value: "ac" },
        { label: "Lift", value: "lift" },
        { label: "Security", value: "security" },
        { label: "Generator", value: "generator" },
        { label: "Gym", value: "gym" },
        { label: "Swimming Pool", value: "pool" },
    ];

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
   
    // ১. প্রথমে ফর্মের সব নেটিভ ডেটা অবজেক্টে রূপান্তর করুন
    const data = Object.fromEntries(formData.entries());
   
   
 

    const selectedAmenities = formData.getAll("amenities");

 
    const newErrors = {};
    if (!data.title) newErrors.title = "Property title is required";
    if (!data.location) newErrors.location = "Location is required";
    if (!data.propertyType) newErrors.propertyType = "Property type is required";
    if (!data.rentType) newErrors.rentType = "Rent type is required"; // 👈 এখন আর এরর আসবে না
    if (!data.monthlyRent) newErrors.monthlyRent = "Monthly rent is required";
    if (!data.propertySize) newErrors.propertySize = "Property size is required";
    if (!data.bedrooms) newErrors.bedrooms = "Number of bedrooms is required";
    if (!data.bathrooms) newErrors.bathrooms = "Number of bathrooms is required";
    if (!data.imageUrl) newErrors.imageUrl = "Property image URL is required";

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast.error("Please fill out all required fields.");
        return;
    }

    setErrors({});
   

        const payload = {
            ...data,
           ownerId: user?.id || user?._id || null,
           
           status: "pending",
            amenities: selectedAmenities,
            createdAt: new Date(),
        };

    try {
            const currentToken=session?.session?.token
            const res = await createProperty(payload,currentToken);
            if (res?.insertedId) {
                toast.success("Property added successfully 🎉");
   
                setPropertyType("");
                setRentType("");
               
                e.target.reset();
                router.push("/dashboard/owner");
            } else {
                toast.error("Failed to add property");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    };

    // স্টাইলিং ক্লাসেস
    const textInputClass = "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg h-12 px-3 text-sm placeholder:text-zinc-600 outline-none transition-all";
    const iconInputClass = "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg h-12 pl-10 pr-3 text-sm placeholder:text-zinc-600 outline-none transition-all";
    const textAreaClass = "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg p-3 text-sm placeholder:text-zinc-600 outline-none transition-all";

    const selectBoxClass = "w-full";
    const triggerClasses = "w-full flex items-center justify-between bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] h-12 rounded-lg px-3 text-white transition-all text-sm outline-none data-[focused=true]:border-zinc-600 data-[invalid=true]:border-danger";
    const popoverClasses = "bg-[#1c1c1e] border border-zinc-800 text-white rounded-lg shadow-xl p-1";
    const listItemClasses = "flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800";

    return (
        <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl">
               
                <div className="border-b border-zinc-800 pb-6 mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight">Add New Property</h1>
                    <p className="text-zinc-400 text-sm mt-1">
                        Provide accurate details to list your property on the platform.
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
                        <House size={14} className="text-zinc-500" />
                        Listing as: <span className="font-semibold text-zinc-300">{user?.name  || "Independent Owner"}</span>
                        <span className="text-emerald-500 font-medium bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-900/50">Verified</span>
                    </div>
                </div>

                <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior="aria">
                   
                    {/* SECTION 1 */}
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                            Basic Information
                        </legend>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField name="title" isInvalid={!!errors.title} className="flex flex-col gap-1 w-full relative">
                                <Label className="text-zinc-400 font-medium text-sm">Property Title</Label>
                                <div className="relative flex items-center">
                                    <House size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                    <Input placeholder="e.g. Luxury Apartment in Gulshan" className={iconInputClass} />
                                </div>
                                {errors.title && <FieldError className="text-xs text-danger mt-1">{errors.title}</FieldError>}
                            </TextField>

                            <TextField name="location" isInvalid={!!errors.location} className="flex flex-col gap-1 w-full relative">
                                <Label className="text-zinc-400 font-medium text-sm">Location</Label>
                                <div className="relative flex items-center">
                                    <Pin size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                    <Input placeholder="e.g. Gulshan, Dhaka" className={iconInputClass} />
                                </div>
                                {errors.location && <FieldError className="text-xs text-danger mt-1">{errors.location}</FieldError>}
                            </TextField>
                        </div>
                    </Fieldset>

                    {/* SECTION 2 */}
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                            Specifications & Pricing
                        </legend>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* PROPERTY TYPE SELECT (FIXED) */}
                            {/* <Select
                                className={selectBoxClass}
                                name="propertyType"
                                isInvalid={!!errors.propertyType}
                                selectedKeys={propertyType ? [propertyType] : []}
                                onSelectionChange={(keys) => {
                                    if (keys && typeof keys === "object" && Symbol.iterator in keys) {
                                        const value = Array.from(keys)[0];
                                        setPropertyType(String(value || ""));
                                    } else {
                                        setPropertyType("");
                                    }
                                }}
                            >
                                <Label className="text-zinc-400 font-medium text-sm mb-1 block">Property Type</Label>
                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value placeholder="Select type" />
                                    <Select.Indicator />
                                </Select.Trigger>
                                {errors.propertyType && <span className="text-xs text-danger mt-1 block">{errors.propertyType}</span>}
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="apartment" className={listItemClasses} textValue="Apartment">Apartment</ListBox.Item>
                                        <ListBox.Item id="house" className={listItemClasses} textValue="House">House</ListBox.Item>
                                        <ListBox.Item id="commercial" className={listItemClasses} textValue="Commercial">Commercial</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select> */}
                   <Select
                  name="propertyType"
                  isRequired
                  className="w-full"
                 
                >
                  <Label className="text-zinc-400 font-medium text-sm mb-1 block">Property type</Label>
                  <Select.Trigger className="rounded-2xl">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="Commercial" textValue="Commercial">
                        Commercial
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="House" textValue="House">
                        House
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="Apartment" textValue="Apartment">
                        Apartment
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                   
               
                    </ListBox>
                  </Select.Popover>
                </Select>

                            {/* RENT TYPE SELECT (FIXED) */}
    <Select
                  name="rentType"
                  isRequired
                  className="w-full"
                 
                >
                  <Label className="text-zinc-400 font-medium text-sm mb-1 block">Rent Type</Label>
                  <Select.Trigger className="rounded-2xl">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="Weekly" textValue="Weekly">
                        Weekly
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="Monthly" textValue="Monthly">
                      Monthly
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="Yearly" textValue="Yearly">
                     Yearly
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                   
               
                    </ListBox>
                  </Select.Popover>
                </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField name="monthlyRent" isInvalid={!!errors.monthlyRent} className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Rent (BDT)</Label>
                                <div className="relative flex items-center">
                                    <CircleDollar size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                    <Input placeholder="Monthly Rent" type="number" className={iconInputClass} />
                                </div>
                                {errors.monthlyRent && <FieldError className="text-xs text-danger mt-1">{errors.monthlyRent}</FieldError>}
                            </TextField>

                            <TextField name="propertySize" isInvalid={!!errors.propertySize} className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Size (Sqft)</Label>
                                <div className="relative flex items-center">
                                    <SquareHashtag size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                    <Input placeholder="Size in sqft" type="number" className={iconInputClass} />
                                </div>
                                {errors.propertySize && <FieldError className="text-xs text-danger mt-1">{errors.propertySize}</FieldError>}
                            </TextField>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField name="bedrooms" isInvalid={!!errors.bedrooms} className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Bedrooms</Label>
                                <div className="relative flex items-center">
                                    <LayoutRows size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                    <Input placeholder="Total bedrooms" type="number" className={iconInputClass} />
                                </div>
                                {errors.bedrooms && <FieldError className="text-xs text-danger mt-1">{errors.bedrooms}</FieldError>}
                            </TextField>

                            <TextField name="bathrooms" isInvalid={!!errors.bathrooms} className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Bathrooms</Label>
                                <div className="relative flex items-center">
                                    <LayoutRows size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                    <Input placeholder="Total bathrooms" type="number" className={iconInputClass} />
                                </div>
                                {errors.bathrooms && <FieldError className="text-xs text-danger mt-1">{errors.bathrooms}</FieldError>}
                            </TextField>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField name="extraFeatures" className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Extra Features (Optional)</Label>
                                <div className="relative flex items-center">
                                    <ListUl size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                    <Input placeholder="e.g. Balcony, Pet Friendly, CCTV" className={iconInputClass} />
                                </div>
                            </TextField>

                            <TextField name="imageUrl" isInvalid={!!errors.imageUrl} className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Image URL</Label>
                                <div className="relative flex items-center">
                                    <Picture size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                    <Input placeholder="Cloudinary / Imgbb CDN link" type="url" className={iconInputClass} />
                                </div>
                                {errors.imageUrl && <FieldError className="text-xs text-danger mt-1">{errors.imageUrl}</FieldError>}
                            </TextField>
                        </div>
                    </Fieldset>

                    {/* SECTION 3 */}
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                            Amenities & Detailed Description
                        </legend>

                        <div className="w-full">
                            <Label className="mb-3 block font-medium text-sm text-zinc-400">Amenities</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {amenitiesOptions.map((amenity) => (
                                    <label
                                        key={amenity.value}
                                        className="flex items-center gap-3 rounded-xl p-3 border border-zinc-800 bg-[#1c1c1e] cursor-pointer hover:bg-[#242426] transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            name="amenities"
                                            value={amenity.value}
                                            className="rounded text-black bg-zinc-900 border-zinc-700 h-4 w-4 accent-white"
                                        />
                                        <span className="text-sm font-medium text-zinc-300">{amenity.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                     
                 
                    </Fieldset>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 w-full">
                        <Button
                            type="button"
                            variant="bordered"
                            onClick={() => router.push("/dashboard/owner")}
                            className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-6 font-medium h-11"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
                        >
                            Submit Property
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}