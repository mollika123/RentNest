"use client";

import React, { useState } from "react";
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextField,
  Select,
} from "@heroui/react";
import { useDisclosure } from "@heroui/use-disclosure"; // 🌟 সঠিক সাব-প্যাকেজ ইম্পোর্ট
import { House, Pin, CircleDollar, SquareHashtag, LayoutRows, ListUl, Picture, Pencil } from "@gravity-ui/icons";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function EditModal({ property }) {
  console.log("Property inside modal:", property);
  const router = useRouter();
  
  // 🌟 মডাল ওপেন/ক্লোজ স্টেট কন্ট্রোল
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const {
    _id,
    title,
    location,
    propertyType: initialPropertyType,
    rentType: initialRentType,
    monthlyRent,
    propertySize,
    bedrooms,
    bathrooms,
    extraFeatures,
    imageUrl,
    amenities: initialAmenities = [],
  } = property;

  // সিলেক্টেড এবং চেকবক্স স্টেট ম্যানেজমেন্ট
  const [propertyType, setPropertyType] = useState(initialPropertyType || "");
  const [rentType, setRentType] = useState(initialRentType || "");
  const [selectedAmenities, setSelectedAmenities] = useState(initialAmenities);

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

  // চেকবক্স হ্যান্ডেল করার ফাংশন
  const handleAmenityChange = (value) => {
    if (selectedAmenities.includes(value)) {
      setSelectedAmenities(selectedAmenities.filter((item) => item !== value));
    } else {
      setSelectedAmenities([...selectedAmenities, value]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());

    // পেলোড অবজেক্ট তৈরি করা হচ্ছে
    const payload = {
      title: formDataObj.title,
      location: formDataObj.location,
      propertyType:formDataObj.propertyType,       // সিলেক্ট স্টেট থেকে আসছে
      rentType: formDataObj.rentType,               // সিলেক্ট স্টেট থেকে আসছে
      monthlyRent: Number(formDataObj.monthlyRent),
      propertySize: Number(formDataObj.propertySize),
      bedrooms: Number(formDataObj.bedrooms),
      bathrooms: Number(formDataObj.bathrooms),
      extraFeatures: formDataObj.extraFeatures,
      imageUrl: formDataObj.imageUrl,
      amenities: selectedAmenities,     // চেকবক্স স্টেট থেকে আসছে
      updatedAt: new Date(),
    };
  

     
    try {
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${_id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
  // ⚠️ credentials: "include" লাইনটি আপাতত বাদ দিন, এটি অনেক সময় লোকালহোস্টে ব্লক তৈরি করে
});

      const result = await res.json();

      if (res.ok && (result.success || result.modifiedCount > 0)) {
        toast.success("Property updated successfully 🎉");
        onClose(); // 🌟 ডাটা সেভ হলে মডালটি বন্ধ হয়ে যাবে
        router.refresh(); // 🚀 টেবিলের ডাটা সাথে সাথে ফ্রন্টঅ্যান্ডে চেঞ্জ হবে
      } else {
        toast.error(result.message || "Failed to update property");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Something went wrong while connecting to server!");
    }
  };

  // স্টাইলিং ক্লাসেস
  const iconInputClass = "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg h-12 pl-10 pr-3 text-sm placeholder:text-zinc-600 outline-none transition-all";
  const selectTriggerClass = "w-full flex items-center justify-between bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] h-12 rounded-lg px-3 text-white transition-all text-sm outline-none data-[focused=true]:border-zinc-600";
  const popoverClasses = "bg-[#1c1c1e] border border-zinc-800 text-white rounded-lg shadow-xl p-1";
  const listItemClasses = "flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800";

  return (
    <>
      {/* 🚀 Trigger Button */}
      <Button onClick={onOpen} variant="outline" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg font-medium">
        <Pencil className="mr-1" /> Edit
      </Button>

      {/* 🌟 Modal Definition */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            {/* Dialog Container */}
            <Modal.Dialog className="sm:max-w-2xl bg-[#121214] border border-zinc-900 text-white rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]">
              <Modal.CloseTrigger className="text-zinc-400 hover:text-white" />
              
              <Modal.Header className="border-b border-zinc-800 p-6">
                <Modal.Heading className="text-xl font-semibold tracking-tight">Edit Property</Modal.Heading>
              </Modal.Header>

              <Modal.Body className="p-6">
                <Surface variant="default" className="bg-transparent p-0 border-0">
                  <form onSubmit={onSubmit} className="space-y-6">
                    
                    {/* Title & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <TextField defaultValue={title} isRequired className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-400 font-medium text-sm">Property Title</Label>
                        <div className="relative flex items-center">
                          <House size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                          <Input name="title" placeholder="Luxury Apartment in Gulshan" className={iconInputClass} />
                        </div>
                        <FieldError className="text-xs text-danger mt-1" />
                      </TextField>

                      <TextField defaultValue={location} isRequired className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-400 font-medium text-sm">Location</Label>
                        <div className="relative flex items-center">
                          <Pin size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                          <Input name="location" placeholder="Gulshan, Dhaka" className={iconInputClass} />
                        </div>
                        <FieldError className="text-xs text-danger mt-1" />
                      </TextField>
                    </div>

                    {/* Property Type & Rent Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    {/* Rent & Size */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <TextField defaultValue={monthlyRent} type="number" isRequired className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-400 font-medium text-sm">Rent (BDT)</Label>
                        <div className="relative flex items-center">
                          <CircleDollar size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                          <Input name="monthlyRent" type="number" placeholder="Monthly Rent" className={iconInputClass} />
                        </div>
                        <FieldError className="text-xs text-danger mt-1" />
                      </TextField>

                      <TextField defaultValue={propertySize} type="number" isRequired className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-400 font-medium text-sm">Size (Sqft)</Label>
                        <div className="relative flex items-center">
                          <SquareHashtag size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                          <Input name="propertySize" type="number" placeholder="Size in sqft" className={iconInputClass} />
                        </div>
                        <FieldError className="text-xs text-danger mt-1" />
                      </TextField>
                    </div>

                    {/* Bedrooms & Bathrooms */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <TextField defaultValue={bedrooms} type="number" isRequired className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-400 font-medium text-sm">Bedrooms</Label>
                        <div className="relative flex items-center">
                          <LayoutRows size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                          <Input name="bedrooms" type="number" placeholder="Total bedrooms" className={iconInputClass} />
                        </div>
                        <FieldError className="text-xs text-danger mt-1" />
                      </TextField>

                      <TextField defaultValue={bathrooms} type="number" isRequired className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-400 font-medium text-sm">Bathrooms</Label>
                        <div className="relative flex items-center">
                          <LayoutRows size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                          <Input name="bathrooms" type="number" placeholder="Total bathrooms" className={iconInputClass} />
                        </div>
                        <FieldError className="text-xs text-danger mt-1" />
                      </TextField>
                    </div>

                    {/* Features & ImageUrl */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <TextField defaultValue={extraFeatures} className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-400 font-medium text-sm">Extra Features (Optional)</Label>
                        <div className="relative flex items-center">
                          <ListUl size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                          <Input name="extraFeatures" placeholder="e.g. Balcony, Pet Friendly, CCTV" className={iconInputClass} />
                        </div>
                      </TextField>

                      <TextField defaultValue={imageUrl} isRequired className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-400 font-medium text-sm">Image URL</Label>
                        <div className="relative flex items-center">
                          <Picture size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                          <Input name="imageUrl" type="url" placeholder="Cloudinary / Imgbb CDN link" className={iconInputClass} />
                        </div>
                        <FieldError className="text-xs text-danger mt-1" />
                      </TextField>
                    </div>

                    {/* Amenities Section */}
                    <div className="w-full border-t border-zinc-800 pt-4">
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
                              checked={selectedAmenities.includes(amenity.value)}
                              onChange={() => handleAmenityChange(amenity.value)}
                              className="rounded text-black bg-zinc-900 border-zinc-700 h-4 w-4 accent-white"
                            />
                            <span className="text-sm font-medium text-zinc-300">{amenity.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Modal Footer Buttons */}
                    <Modal.Footer className="border-t border-zinc-800 pt-4 flex justify-end gap-3 w-full">
                      <Button type="button" variant="light" onClick={onClose} className="text-zinc-400 hover:text-white">
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 h-11 transition-colors">
                        Save Changes
                      </Button>
                    </Modal.Footer>
                    
                  </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}