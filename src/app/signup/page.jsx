"use client";

import { useState } from "react";
import {
    Card, Button, Link, TextField, Select,
    Label, InputGroup, Input, RadioGroup, Radio, ListBox
} from "@heroui/react";
import { Eye, EyeSlash, Person, At, ShieldKeyhole, Picture } from "@gravity-ui/icons";
import { authClient, signUp } from "@/lib/auth-client";

export default function SignupPage() {
    // ফর্মের স্টেটসমূহ (Form Fields)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photoUrl, setPhotoUrl] = useState(""); // ছবির লিংকের জন্য স্টেট
    const [role, setRole] = useState("tenant"); // রিকোয়ারমেন্ট অনুযায়ী ডিফল্ট রোল 'tenant'

    // ইউজার ইন্টারফেসের স্টেটসমূহ (UI States)
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);
    const handleGoogleSignIn = async () => {
      await authClient.signIn.social({
          provider: 'google'
      })
    }
    const handleSignup = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            // auth-client এর মাধ্যমে সাইন-আপ রিকোয়েস্ট পাঠানো
            const { data, error: authError } = await signUp.email({
                email,
                password,
                name,
                role,
                image: photoUrl, // এখানে সরাসরি ফটোর লিংকটি পাঠানো হচ্ছে
                callbackURL: "/",
            });


            if (authError) {
                setError(authError.message || "Something went wrong during signup.");
            } else {
                setSuccess("Account created successfully! Welcome.");
                // ফর্ম রিসেট করা
                setName("");
                setEmail("");
                setPassword("");
                setPhotoUrl("");
                
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
            <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">

                {/* হেডার অংশ */}
                <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Create an account</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Fill in the fields below to get started</p>
                </div>

                {/* ফর্ম বডি */}
                <form onSubmit={handleSignup} className="flex flex-col gap-5">

                    {/* নাম (Name Field) */}
                    <TextField isRequired name="name" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <Person className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>

                    {/* ইমেইল (Email Field) */}
                    <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <At className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>

                    {/* ফটোর লিংক (Photo URL Field) */}
                    <TextField isRequired name="photoUrl" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Photo URL</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <Picture className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                type="url"
                                placeholder="https://example.com/your-photo.jpg"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>

                    {/* পাসওয়ার্ড (Password Field) */}
                    <TextField isRequired name="password" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <ShieldKeyhole className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                type={isVisible ? "text" : "password"}
                                placeholder="Choose a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                            <button
                                className="focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label="toggle password visibility"
                            >
                                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        
                        </InputGroup>
                    </TextField>

                    {/* রোল সিলেকশন (ইনলাইন করা হয়েছে) */}
                    {/* <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Select Role</Label>
                        <RadioGroup 
                            value={role} 
                            onValueChange={setRole} 
                            orientation="horizontal"
                            className="flex flex-row gap-6 pt-1"
                        >
                            <Radio value="tenant" className="flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200 cursor-pointer">
                                Tenant
                            </Radio>
                            <Radio value="owner" className="flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200 cursor-pointer">
                                Owner
                            </Radio>
                        </RadioGroup>
                    </div> */}
                       
    <Select
  isRequired
  name="role"
  placeholder="Select one"
  onChange = {value => setRole(value)} orientation="horizontal"
>
  <Label>Signup As</Label>

  <Select.Trigger>
    <Select.Value />
    <Select.Indicator />
  </Select.Trigger>

  <Select.Popover>
    <ListBox>
      <ListBox.Item id="owner" textValue="owner">
        Owner
        <ListBox.ItemIndicator />
      </ListBox.Item>

      <ListBox.Item id="tenant" textValue="tenant">
        Tenant
        <ListBox.ItemIndicator />
      </ListBox.Item>
    </ListBox>
  </Select.Popover>
                    </Select>
                      <p className="text-center">Or</p>
        
          <Button onClick={handleGoogleSignIn} variant="outline" className={'w-full bg-blue-600 text-white'}> Register With Google</Button>
                    {/* এরর মেসেজ */}
                    {error && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                            <span className="font-semibold">Error:</span> {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                            <span className="font-semibold">Success:</span> {success}
                        </div>
                    )}

                    {/* সাবমিট বাটন */}
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full bg-blue-600 text-white"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Sign Up
                    </Button>

                    {/* সাইন-ইন পেজে যাওয়ার লিংক */}
                    <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Already have an account?{" "}
                        <Link href="/signin" className="font-medium cursor-pointer text-sm text-blue-600 dark:text-blue-400">
                            Sign in instead
                        </Link>
                    </div>

                </form>
            </Card>
        </div>
    );
}