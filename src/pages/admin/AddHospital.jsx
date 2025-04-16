"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/ImageUpload";
import { BASE_URL } from "@/lib/utils";
import { toast } from "react-toastify";
import { Stepper } from "@/components/stepper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Step 1: Hospital Information Schema
const hospitalSchema = z.object({
  name: z.string().min(1, "Hospital name is required"),
  location: z.string().min(1, "Location is required"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .regex(/^(\+251|0)(9|7)[0-9]{8}$/, "Invalid Ethiopian phone number"),
  licenseNumber: z.string().min(1, "License number is required"),
  licenseImage: z.string().min(1, "License image is required")
});

// Step 2: Admin Information Schema
const adminSchema = z.object({
  role: z.literal("HospitalAdministrator", {
    required_error: "Role is required",
  }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
});

export default function AddHospitalForm() {
  const [step, setStep] = useState(1);
  const [hospitalId, setHospitalId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form for hospital information
  const hospitalForm = useForm({
    resolver: zodResolver(hospitalSchema),
    defaultValues: {
      name: "",
      location: "",
      contactNumber: "",
      licenseNumber: "",
      licenseImage: "",
    },
  });

  // Form for admin information
  const adminForm = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      role: "HospitalAdministrator",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  const onHospitalSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/systemAdmin/register-hospital`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),  
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to register hospital");
      }

      const data = await response.json();
      setHospitalId(data.hospital._id);
      setStep(2);
      toast.success("Hospital registered successfully! Now add the administrator.");
    } catch (error) {
      console.error("Hospital registration error:", error);
      toast.error(error.message || "Failed to register hospital");
    } finally {
      setLoading(false);
    }
  };

  const onAdminSubmit = async (values) => {
    if (!hospitalId) {
      toast.error("Hospital ID is missing");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/systemAdmin/register-hospitalAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          hospitalID: hospitalId,
        }),  
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to register admin");
      }

      const data = await response.json();
      toast.success("Hospital administrator registered successfully!");
      adminForm.reset();
      setStep(1);
      setHospitalId(null);
    } catch (error) {
      console.error("Admin registration error:", error);
      toast.error(error.message || "Failed to register administrator");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, name: 'Hospital Information' },
    { id: 2, name: 'Admin Information' },
  ];

  return (
    <div className="p-6">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Register Hospital</CardTitle>
          <div className="mt-4">
            <Stepper steps={steps} currentStep={step} />
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <Form {...hospitalForm}>
              <form onSubmit={hospitalForm.handleSubmit(onHospitalSubmit)} className="space-y-6">
                <FormField
                  control={hospitalForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hospital Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Saint Gabriel Hospital" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={hospitalForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Addis Ababa, Bole..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={hospitalForm.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+251912345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={hospitalForm.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number</FormLabel>
                      <FormControl>
                        <Input placeholder="AB1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={hospitalForm.control}
                  name="licenseImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Image</FormLabel>
                      <FormControl>
                        <ImageUpload 
                          onChange={field.onChange} 
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Next: Add Administrator"}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {step === 2 && (
            <Form {...adminForm}>
              <form onSubmit={adminForm.handleSubmit(onAdminSubmit)} className="space-y-6">
                <FormField
                  control={adminForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="HospitalAdministrator">
                            Hospital Administrator
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={adminForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={adminForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={adminForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="admin@hospital.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={adminForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={adminForm.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={adminForm.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep(1)}
                    disabled={loading}
                  >
                    Back
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Complete Registration"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}