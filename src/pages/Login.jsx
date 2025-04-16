// src/pages/Login.jsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "@/lib/utils";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import getUser from "@/lib/getUser";
import { roleRedirects } from "@/lib/role";
import { useUser } from "@/context/UserContext";

const roles = [
  "Admin",
  "HospitalAdministrator",
  "Receptionist",
  "Doctor",
  "Triage",
  "LabTechnician",
  "Pharmacist",
];

// Zod validation schema
const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(roles, { required_error: "Role is required" }),
});

const Login = () => {
const navigate = useNavigate();
const { setUserRole } = useUser(); 


const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        username: "",
        password: "",
        role: undefined,
    },
});

const onSubmit = async (data) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: data.username,
          password: data.password,
          role: data.role,
        }),
      });
  
      const responseData = await res.json();
   
      if (!res.ok) {
        throw new Error(responseData.msg || "Login failed");
      }
      const user = await getUser();
 
      if (user) {
        setUserRole(user.role);  
        navigate(roleRedirects[user.role] || "/not-authorized");
        toast.success("Login successful");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Login Error:", error);
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Login</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
