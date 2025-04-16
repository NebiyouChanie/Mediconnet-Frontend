"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { toast } from "react-toastify";

// Sample hospitals for dropdown
const sampleHospitals = [
  { id: "1", name: "General Hospital" },
  { id: "2", name: "Community Medical Center" },
  { id: "3", name: "Regional Health Center" },
]

const AddAdmin = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hospitals, setHospitals] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hospitalId: "",
    phoneNumber: "",
    status: "active",
  })

  // Simulate fetching hospitals
  useEffect(() => {
    // In a real app, you would fetch this data from your API
    setHospitals(sampleHospitals)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would send this data to your API
      console.log("Submitting admin data:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Hospital admin added successfully")
      navigate("/system-admin/admin-management")
    } catch (error) {
      console.error("Error adding admin:", error)
      toast.error("Failed to add hospital admin")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button variant="outline" onClick={() => navigate("/system-admin/admin-management")} className="mb-6">
        Back to Admin Management
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add Hospital Administrator</CardTitle>
          <CardDescription>Create a new administrator account for a hospital</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hospitalId">Hospital</Label>
              <Select
                value={formData.hospitalId}
                onValueChange={(value) => handleSelectChange("hospitalId", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select hospital" />
                </SelectTrigger>
                <SelectContent>
                  {hospitals.map((hospital) => (
                    <SelectItem key={hospital.id} value={hospital.id}>
                      {hospital.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">The administrator will be assigned to this hospital</p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate("/system-admin/admin-management")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Administrator"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default AddAdmin
