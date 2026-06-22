'use client';

import React, { useState } from 'react';
import { 
    Form, 
    Fieldset, 
    TextField, 
    TextArea, 
    Label, 
    Input, 
    FieldError, 
    Select, 
    ListBox, 
    Button
} from '@heroui/react';
import { ArrowUpToLine, Globe, Factory, ArrowRight, Pencil, ChevronDown } from '@gravity-ui/icons';
// toast ইম্পোর্ট ঠিক করে নিবে (যেমন react-hot-toast বা তোমার ব্যবহৃত লাইব্রেরি)
import { toast } from 'react-hot-toast'; 
import Image from 'next/image';
import { createAgency, createCompany } from '@/lib/actions/agency';

// ডিজাইন থিম কন্সট্যান্টস
const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
const selectBoxClass = "w-full flex flex-col gap-1";
const triggerClasses = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-zinc-700";
const popoverClasses = "bg-zinc-950 border border-zinc-800 rounded-lg p-1 shadow-xl min-w-[200px]";
const listItemClasses = "text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-900 hover:text-white outline-none data-[focused=true]:bg-zinc-900";
const textAreaClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

export default function OwnerProfile({ owner, ownerAgency }) {
    // ১. প্রপার্টি প্ল্যাটফর্ম অনুযায়ী স্টেট পরিবর্তন
    const [agency, setAgency] = useState(ownerAgency || null); 
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    
    const [logoUrl, setLogoUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // ২. Imgbb ইমেজ আপলোড হ্যান্ডলার
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, logo: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_API; 
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (data.success) {
                setLogoUrl(data.data.url);
                setErrors(prev => ({ ...prev, logo: null }));
            } else {
                setErrors(prev => ({ ...prev, logo: "Upload failed. Try again." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, logo: "Network error during logo upload" }));
        } finally {
            setIsUploading(false);
        }
    };

    // ৩. ফর্ম সাবমিট হ্যান্ডলার (রেন্টাল প্ল্যাটফর্ম অনুযায়ী ফিল্ড ম্যাপিং)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const agencyName = formData.get('agencyName');
        const contactEmail = formData.get('contactEmail');
        const propertyTypeExpertise = formData.get('propertyTypeExpertise');
        const location = formData.get('location');
        const experience = formData.get('experience');
        const description = formData.get('description');

        const newErrors = {};
        if (!agencyName) newErrors.agencyName = "Agency or Owner name is required";
        if (!contactEmail) newErrors.contactEmail = "Contact email is required";
        if (!location) newErrors.location = "Operating location is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newAgencyData = {
            name: agencyName,
            contactEmail,
            propertyTypeExpertise: propertyTypeExpertise || 'Residential',
            location,
            experience: experience || '1-3 Years',
            description,
            logo: logoUrl || (agency ? agency.logo : owner?.photo || ''),
            ownerId: owner?.id || owner?._id
        };

        try {
            // এখানে তোমার প্রজেক্টের রিয়েল ব্যাকেন্ড API কলটি করবে (Axios বা Fetch দিয়ে)
            // উদাহরণ: const response = await axios.post('/api/owner/agency', newAgencyData);
            
            setAgency(newAgencyData);

            const payload = await createAgency(newAgencyData)
            
             console.log(payload,"ppppp");
        if(payload.insertedId) {

            toast.success("Company profile created successfully!");
        }
          
            setErrors({});
            setIsEditing(false);
        } catch (err) {
            toast.error("Failed to save profile details.");
        }
    };

    const startRegistration = () => {
        setLogoUrl('');
        setIsEditing(true);
    };

    const startEditing = () => {
        if (agency) setLogoUrl(agency.logo);
        setIsEditing(true);
    };

    // --- SUB-VIEW 1: প্রোফাইল না থাকলে যা দেখাবে ---
    if (!agency?._id && !isEditing) {
        return (
            <div className="max-w-2xl mx-auto my-12 bg-zinc-950 border border-zinc-900 rounded-xl p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-zinc-900/50 rounded-full flex items-center justify-center mx-auto border border-zinc-800">
                    <Factory size={24} className="text-zinc-500" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-zinc-200">Owner Profile Not Configured</h2>
                    <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                        To start listing your rental properties, managing booking requests, and tracking earnings, please complete your profile details.
                    </p>
                </div>
                <Button 
                    onPress={startRegistration}
                    className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 h-11 transition-all"
                >
                    Setup Owner Profile <ArrowRight size={16} className="ml-1" />
                </Button>
            </div>
        );
    }

    // --- SUB-VIEW 2: প্রোফাইল ড্যাশবোর্ড মোড ---
    if (agency && !isEditing) {
        return (
            <div className="max-w-4xl mx-auto my-8 bg-zinc-950 border border-zinc-900 rounded-xl p-8 space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-6">
                    <div className="flex items-center gap-4">
                        {agency.logo ? (
                            <Image src={agency.logo} alt={agency.name} width={64} height={64} className="w-16 h-16 rounded-xl object-contain bg-zinc-900 p-2 border border-zinc-800" />
                        ) : (
                            <div className="w-16 h-16 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800">
                                <Factory size={24} className="text-zinc-600" />
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-white">{agency.name}</h1>
                                <span className="text-xs px-2.5 py-1 rounded-full font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                    Verified Owner
                                </span>
                            </div>
                            <p className="text-sm text-zinc-400 flex items-center gap-1 mt-1">
                                <Globe size={14} className="text-zinc-500" /> {agency.contactEmail}
                            </p>
                        </div>
                    </div>
                    <Button 
                        onPress={startEditing}
                        variant="bordered"
                        className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-4 font-medium h-10 flex items-center gap-2"
                    >
                        <Pencil size={14} /> Edit Profile
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-lg">
                        <span className="text-xs text-zinc-500 uppercase font-semibold block">Property Expertise</span>
                        <span className="text-zinc-300 font-medium mt-1 block">{agency.propertyTypeExpertise}</span>
                    </div>
                    <div className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-lg">
                        <span className="text-xs text-zinc-500 uppercase font-semibold block">Operating Area</span>
                        <span className="text-zinc-300 font-medium mt-1 block">{agency.location}</span>
                    </div>
                    <div className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-lg">
                        <span className="text-xs text-zinc-500 uppercase font-semibold block">Hosting Experience</span>
                        <span className="text-zinc-300 font-medium mt-1 block">{agency.experience}</span>
                    </div>
                </div>

                {agency.description && (
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">About Owner / Agency Policy</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap bg-zinc-900/20 border border-zinc-900/60 p-4 rounded-xl">
                            {agency.description}
                        </p>
                    </div>
                )}
            </div>
        );
    }

    // --- SUB-VIEW 3: ফর্ম এডিটিং ও রেজিস্ট্রেশন ভিউ ---
    return (
        <div className="max-w-3xl mx-auto my-8 bg-zinc-950 p-8 border border-zinc-900 rounded-xl">
            <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior="aria">
                <Fieldset className="space-y-6 w-full">
                    <legend className="text-xl font-semibold text-zinc-200 border-b border-zinc-900 w-full pb-3 mb-2">
                        {agency ? 'Update Owner Profile' : 'Configure Owner Workspace'}
                    </legend>

                    {/* ROW 1: Name + Expertise */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="agencyName" defaultValue={agency?.name || owner?.name || ''} isInvalid={!!errors.agencyName} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Owner / Agency Name</Label>
                            <Input placeholder="e.g. John's Properties" className={textInputClass} />
                            {errors.agencyName && <FieldError className="text-xs text-rose-500 mt-1">{errors.agencyName}</FieldError>}
                        </TextField>

                        <Select className={selectBoxClass} name="propertyTypeExpertise" defaultSelectedKeys={[agency?.propertyTypeExpertise?.toLowerCase() || 'residential']}>
                            <Label className="text-zinc-400 font-medium text-sm mb-1 block">Property Type Expertise</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value className="text-white" />
                                <Select.Indicator><ChevronDown size={16} className="text-zinc-500" /></Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none">
                                    <ListBox.Item id="residential" className={listItemClasses} textValue="Residential">Residential</ListBox.Item>
                                    <ListBox.Item id="commercial" className={listItemClasses} textValue="Commercial">Commercial</ListBox.Item>
                                    <ListBox.Item id="apartments" className={listItemClasses} textValue="Apartments Only">Apartments Only</ListBox.Item>
                                    <ListBox.Item id="villas" className={listItemClasses} textValue="Luxury Villas">Luxury Villas</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* ROW 2: Email + Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="contactEmail" defaultValue={agency?.contactEmail || owner?.email || ''} isInvalid={!!errors.contactEmail} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Contact Email</Label>
                            <Input placeholder="owner@example.com" className={textInputClass} />
                            {errors.contactEmail && <FieldError className="text-xs text-rose-500 mt-1">{errors.contactEmail}</FieldError>}
                        </TextField>

                        <TextField name="location" defaultValue={agency?.location || ''} isInvalid={!!errors.location} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Operating City/Location</Label>
                            <div className="relative flex items-center">
                                <Globe size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                <Input placeholder="e.g. Dhaka, Bangladesh" className={`${textInputClass} pl-10`} />
                            </div>
                            {errors.location && <FieldError className="text-xs text-rose-500 mt-1">{errors.location}</FieldError>}
                        </TextField>
                    </div>

                    {/* ROW 3: Hosting Experience + Custom File Logo Upload Block */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <Select className={selectBoxClass} name="experience" defaultSelectedKeys={[agency?.experience || '1-3']}>
                            <Label className="text-zinc-400 font-medium text-sm mb-1 block">Hosting Experience</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value className="text-white" />
                                <Select.Indicator><ChevronDown size={16} className="text-zinc-500" /></Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none">
                                    <ListBox.Item id="1-3" className={listItemClasses} textValue="1-3 Years">1-3 Years</ListBox.Item>
                                    <ListBox.Item id="3-5" className={listItemClasses} textValue="3-5 Years">3-5 Years</ListBox.Item>
                                    <ListBox.Item id="5+" className={listItemClasses} textValue="5+ Years">5+ Years</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        <div className="flex flex-col gap-1 w-full">
                            <span className="text-zinc-400 font-medium text-sm">Owner Image / Agency Logo</span>
                            <div className="flex items-center gap-4 mt-1">
                                <label className="w-14 h-14 border border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                    <input 
                                        type="file" 
                                        accept="image/png, image/jpeg" 
                                        onChange={handleLogoUpload} 
                                        className="hidden" 
                                    />
                                    {logoUrl ? (
                                        <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ArrowUpToLine size={18} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                                    )}
                                </label>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-zinc-300">
                                        {isUploading ? 'Uploading file...' : 'Upload image'}
                                    </span>
                                    <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                    {errors.logo && <span className="text-xs text-rose-500 mt-1">{errors.logo}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ROW 4: Brief Description */}
                    <div className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-400 font-medium text-sm">Rental Policy & Bio</Label>
                        <TextArea
                            name="description"
                            defaultValue={agency?.description || ''}
                            placeholder="Tell potential tenants about your properties, guidelines, and hosting ethics..."
                            rows={4}
                            className={textAreaClass}
                        />
                    </div>
                </Fieldset>

                {/* Form Buttons */}
                <div className="flex justify-end gap-3 pt-5 border-t border-zinc-900 w-full">
                    {agency && (
                        <Button
                            type="button"
                            variant="bordered"
                            onPress={() => setIsEditing(false)}
                            className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 rounded-lg px-5 font-medium h-11"
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
                    >
                        {agency ? 'Save Updates' : 'Complete Setup'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}