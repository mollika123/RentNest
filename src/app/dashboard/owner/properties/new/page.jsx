"use client";

import { useState } from "react";
import {
  Button,
  Checkbox,
  Select,
  ListBox,
  ListBoxItem,
  Label,
} from "@heroui/react";

import {
  Text,
  Pin,
  House,
  ListUl,
  ChevronDown,
} from "@gravity-ui/icons";

export default function AddProperty() {
  const [amenities, setAmenities] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [rentType, setRentType] = useState("");
  const [openType, setOpenType] = useState(false);
  const [openRent, setOpenRent] = useState(false);
  const [openAmenities, setOpenAmenities] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
 const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const amenities = formData.getAll("amenities");
    
  const errors = {};

  if (!data.title) errors.title = "Title required";
  if (!data.location) errors.location = "Location required";
  if (!data.propertyType) errors.propertyType = "Select property type";
  if (!data.rentType) errors.rentType = "Select rent type";

  if (Object.keys(errors).length > 0) {
    console.log("❌ ERRORS:", errors);
    return;
  }
    const payload = {
      ...data,
      amenities,
    };

    console.log("PYTHON READY PAYLOAD:", payload);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-6">

        <h1 className="text-2xl font-bold">Add New Property</h1>

        <form validationBehavior="aria" onSubmit={handleSubmit} className="space-y-6">

          {/* TITLE */}
          <div>
            <Label>Property Title</Label>
            <input
              name="title"
              placeholder="Luxury Apartment"
              className="w-full h-11 border rounded-xl px-3 bg-zinc-50 dark:bg-zinc-800"
            />
          </div>

          {/* LOCATION */}
          <div>
            <Label>Location</Label>
            <input
              name="location"
              placeholder="Dhaka"
              className="w-full h-11 border rounded-xl px-3 bg-zinc-50 dark:bg-zinc-800"
            />
          </div>

          {/* PROPERTY TYPE */}
          <Select
  isRequired
  name="propertyType"
  selectedKeys={propertyType ? new Set([propertyType]) : new Set()}
  onSelectionChange={(keys) => {
    const value = [...keys][0];
    setPropertyType(value?.toString() || "");
  }}
>
  <Label>Property Type</Label>

  <Select.Trigger>
    <Select.Value />
    <Select.Indicator />
  </Select.Trigger>

  <Select.Popover>
    <ListBox>
      <ListBox.Item id="apartment" textValue="apartment">
        Apartment
        <ListBox.ItemIndicator />
      </ListBox.Item>

      <ListBox.Item id="house" textValue="house">
        House
        <ListBox.ItemIndicator />
      </ListBox.Item>

      <ListBox.Item id="commercial" textValue="commercial">
        Commercial
        <ListBox.ItemIndicator />
      </ListBox.Item>
    </ListBox>
  </Select.Popover>
</Select>

          {/* RENT TYPE */}
     <Select
  isRequired
  name="rentType"
  selectedKeys={rentType ? new Set([rentType]) : new Set()}
  onSelectionChange={(keys) => {
    const value = [...keys][0];
    setRentType(value?.toString() || "");
  }}
>
  <Label>Rent Type</Label>

  <Select.Trigger>
    <Select.Value />
    <Select.Indicator />
  </Select.Trigger>

  <Select.Popover>
    <ListBox>
      <ListBox.Item id="monthly" textValue="monthly">
        Monthly
        <ListBox.ItemIndicator />
      </ListBox.Item>

      <ListBox.Item id="yearly" textValue="yearly">
        Yearly
        <ListBox.ItemIndicator />
      </ListBox.Item>

      <ListBox.Item id="sublet" textValue="sublet">
        Sublet
        <ListBox.ItemIndicator />
      </ListBox.Item>
    </ListBox>
  </Select.Popover>
</Select>

          {/* RENT + SIZE */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="monthlyRent"
              placeholder="Monthly Rent"
              className="h-11 border rounded-xl px-3 bg-zinc-50 dark:bg-zinc-800"
            />

            <input
              name="propertySize"
              placeholder="Size sqft"
              className="h-11 border rounded-xl px-3 bg-zinc-50 dark:bg-zinc-800"
            />
          </div>

          {/* AMENITIES */}
          {/* <div className="relative">
            <Label>Amenities</Label>

            <Button
              type="button"
              onPress={() => setOpenAmenities(!openAmenities)}
              className="w-full h-11 border rounded-xl flex justify-between px-3"
            >
              {amenities.length ? amenities.join(", ") : "Select Amenities"}
              <ChevronDown size={16} />
            </Button>

            {openAmenities && (
              <div className="absolute z-50 mt-2 w-full border rounded-xl bg-white dark:bg-zinc-900">
                <ListBox
                  onAction={(key) => {
                    setAmenities((prev) =>
                      prev.includes(key.toString())
                        ? prev.filter((i) => i !== key.toString())
                        : [...prev, key.toString()]
                    );
                  }}
                >
                  {amenitiesList.map((a) => (
                    <ListBoxItem key={a.value} id={a.value}>
                      <div className="flex items-center gap-2">
                        <Checkbox isSelected={amenities.includes(a.value)} />
                        {a.label}
                      </div>
                    </ListBoxItem>
                  ))}
                </ListBox>
              </div>
            )} */}

            {/* hidden field for backend */}
            {/* <input type="hidden" name="amenities" value={amenities.join(",")} />
          </div> */}


         <div>
  <Label className="mb-3 block font-medium">Amenities</Label>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {amenitiesOptions.map((amenity) => (
      <label
        key={amenity.value}
        className="flex items-center gap-2 rounded-2xl p-3 border bg-zinc-50 dark:bg-zinc-800 cursor-pointer"
      >
        <input
          type="checkbox"
          name="amenities"
          value={amenity.value}
          className="rounded"
        />
        <span>{amenity.label}</span>
      </label>
    ))}
  </div>
</div>

          {/* SUBMIT */}
          <Button type="submit" className="w-full h-11 bg-black text-white rounded-xl">
            Submit Property
          </Button>

        </form>
      </div>
    </div>
  );
}